import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';
import path from 'path';

import { ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD } from '#constants/env.constants';
import { SomethingWentWrong } from '#constants/errorMessages.enum';
import { NotFound } from '#constants/responseCodes.enum';
import { templateInfo } from '#email-templates/index';
import { ErrorHandler } from '#helpers/error.handler';

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates')
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASSWORD
  }
});

export const sendMail = async (userEmail, action, context = {}) => {
  const templateToSend = templateInfo[action];

  if (!templateToSend) {
    throw new ErrorHandler(NotFound, SomethingWentWrong);
  }

  const html = await templateParser.render(templateToSend.templateName, context);

  await transporter.sendMail({
    from: {
      name: 'Card Auction',
      address: 'cardAuction@gmail.com'
    },
    to: userEmail,
    subject: templateToSend.subject,
    html
  });
};
