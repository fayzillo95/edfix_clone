// src/email/email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailCodeEnum } from '../../common/types/enum.types';
import { messageGenerator } from '../../common/types/generator.types';

@Injectable()
export class EmailService {
    private email: nodemailer.Transporter;

    constructor() {
        this.email = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'fayzillofn30@gmail.com',
                pass: 'hwhphlkacfqynuve',
            },
        });
    }

    async sendResedPasswordVerify(email: string, code: number, typeMessage : EmailCodeEnum) {
        const result = await this.email.sendMail({
            to: email,
            from: "Auth Service : '<fayzillofn30@gmail.com>'",
            subject: 'Auth Service : "<fayzillofn30@gmail.com>"',
            text: 'Salom sizning tasdiq kodingiz',
            html: messageGenerator(typeMessage,code),
        });
        return result;
    }
}
