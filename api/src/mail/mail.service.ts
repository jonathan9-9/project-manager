import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { sendEmail } from './mail';
import { resetPasswordTemplate } from './email-pass-reset-template';

@Injectable()
export class MailService {
  async sendPasswordResetEmail(user: UserModel, token: string) {
    console.log('TOKEN', token);
    sendEmail(
      {
        from: 'jonathan3060@gmail.com',
        to: user.email,
        subject: 'Rest your password',
        html: resetPasswordTemplate(token, user.id),
      },
      () => {
        console.log('Email sent for password reset');
      },
    );
  }
}
