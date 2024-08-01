import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Project, User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { AccountDetailsDto } from './auth.controller';
import { MailService } from 'src/mail/mail.service';
import { ProjectsService } from 'src/projects/projects.service';
import { FeaturesService } from 'src/features/features.service';
import { UserStoriesService } from 'src/userStories/userStories.service';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private projectsService: ProjectsService,
    private featuresService: FeaturesService,
    private userStoriesService: UserStoriesService,
    private tasksService: TasksService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createAccessToken(user: UserModel, secret?: string) {
    const payload = { sub: user.id };
    if (secret) {
      return this.jwtService.signAsync(payload, {
        secret,
        expiresIn: '5m',
      });
    } else {
      return await this.jwtService.signAsync(payload);
    }
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    try {
      if (!username || !pass) {
        throw new BadRequestException('something went wrong', {
          cause: new Error(),
          description: 'Username and password are both required',
        });
      }
      const user = await this.usersService.findOne(username);

      const passwordMatch = await bcrypt.compare(pass, user?.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid Credentials');
      }
      const payload = { sub: user.id, username: user.username };

      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: jwtConstants.secret,
        }),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.error('Unexpected error at sign in', error);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }
  }

  async signUp(
    username: string,
    password: string,
    email: string,
    name: string,
    photo: string,
  ): Promise<UserModel> {
    const createdUser = await this.usersService.create({
      username,
      password,
      email,
      name,
      photo,
    });
    return createdUser;
  }

  async getProfileInfo(id: number): Promise<object> {
    const user = await this.usersService.findUserById(id);

    return {
      name: user.name,
      email: user.email,
      username: user.username,
      photo: user.photo,
    };
  }

  async editAccountDetails(accountDetailsDto: AccountDetailsDto) {
    const user = await this.usersService.findOne(accountDetailsDto.username);

    if (accountDetailsDto.field === 'password') {
      const unencryptedPassword = accountDetailsDto.value;
      const hashedPassword = await this.hashPassword(unencryptedPassword);
      user[accountDetailsDto.field] = hashedPassword;
    } else {
      // Dynamically update the field based on the 'field' property in the DTO
      user[accountDetailsDto.field] = accountDetailsDto.value;
    }

    // Save the field property value in the database

    const updatedUser = await this.usersService.updateUser(
      { id: user.id },
      user,
    );

    return {
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
    };
  }

  async resetPasswordByEmail(email: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('email not found');
    }
    const token = await this.createAccessToken(user, user.password);

    return this.mailService.sendPasswordResetEmail(user, token);
  }

  async saveNewPassword(newPassword: string, id: number, token: string) {
    try {
      const user = await this.usersService.findUserById(id);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: user.password,
      });

      if (payload) {
        const hashedPassword = await this.hashPassword(newPassword);

        user.password = hashedPassword;

        return await this.usersService.updateUser(
          { id: user.id },
          { password: hashedPassword },
        );
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      throw new Error('Failed to save new password');
    }
  }

  async deleteUser(id: number) {
    return await this.usersService.remove(id);
  }

  async getUserProjects(userId: number) {
    const user = await this.getProfileInfo(userId);
    const projects = await this.projectsService.getUserProjects(userId);
    return {
      user,
      projects,
    };
  }

  // filter to find method changes the structure of the returned data. filter returns an array of objects
  // while find returns an object for a specific project in this case. This allows us to refactor our code on the FE
  async getProject(id: number, userId: number) {
    const projects = await this.projectsService.getUserProjects(userId);

    return projects.find((project) => project.id === id);
  }

  async createProject(name: string, description: string, userId: number) {
    return await this.projectsService.createProject(name, description, userId);
  }

  async createFeature(
    name: string,
    description: string,
    userId: number,
    projectId: number,
  ) {
    const projects = await this.projectsService.getUserProjects(userId);

    const project = projects.find((project) => project.id === projectId);

    if (project.id) {
      await this.featuresService.createFeature(name, description, projectId);

      return await this.projectsService.getProjectById(projectId);
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
  async createUserStory(
    name: string,
    description: string,
    userId: number,
    projectId: number,
    featureId: number,
  ) {
    try {
      const projects = await this.projectsService.getUserProjects(userId);

      const project: Project = projects.find(
        (project) => project.id === projectId,
      );

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      if (project) {
        const features =
          await this.featuresService.getProjectFeatures(projectId);

        const feature = features.find((feature) => feature.id === featureId);

        if (feature) {
          await this.userStoriesService.createUserStory(
            name,
            description,
            featureId,
          );
          return await this.projectsService.getProjectById(projectId);
        } else {
          throw new UnauthorizedException('Unauthorized');
        }
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } catch (e) {
      throw new Error(`Failed to create user story: ${e.message}`);
    }
  }
  async createTask(
    name: string,
    userId: number,
    projectId: number,
    featureId: number,
    userStoryId: number,
  ) {
    try {
      const projects = await this.projectsService.getUserProjects(userId);
      const project = projects.find((project) => project.id === projectId);

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      if (project) {
        // feature variable used simply to check if feature exists before checking
        // for user story to create a task and return the projectById method
        const features =
          await this.featuresService.getProjectFeatures(projectId);
        const feature = features.find((feature) => feature.id === featureId);

        if (feature) {
          const userStories =
            await this.userStoriesService.getFeatureUserStories(featureId);

          const userStory = userStories.find(
            (userStory) => userStory.id === userStoryId,
          );

          if (userStory) {
            await this.tasksService.createTask(name, userStoryId);
            // refactored code into this line below
            return await this.projectsService.getProjectById(projectId);
          } else {
            throw new UnauthorizedException('Unauthorized');
          }
        } else {
          throw new UnauthorizedException('Unauthorized');
        }
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } catch (e) {
      throw new Error(`Failed to create to user task ${e.message}`);
    }
  }
  async updateTask(
    field: string,
    value: string,
    userId: number,
    taskId: number,
  ) {
    try {
      const projectId = await this.tasksService.updateTask(
        field,
        value,
        userId,
        taskId,
      );

      return await this.projectsService.getProjectById(projectId);
    } catch (error) {
      throw error;
    }
  }
}
