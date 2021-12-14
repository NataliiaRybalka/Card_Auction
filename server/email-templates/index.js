import { EMAIL_CONFIRM, REFRESH_PASSWORD } from '#constants/mailActions.constants';

export const templateInfo = {
  [EMAIL_CONFIRM]: {
    templateName: 'emailConfirmation',
    subject: 'Confirm your email'
  },
  [REFRESH_PASSWORD]: {
    templateName: 'refreshPassword',
    subject: 'Refresh Password'
  }
};
