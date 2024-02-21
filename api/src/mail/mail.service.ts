import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

@Injectable()
export class MailService {
  async sendPasswordResetEmail(user: UserModel, token: string) {
    console.log('User', user);
    console.log('token', token);

    return 'Hello';
  }
}
