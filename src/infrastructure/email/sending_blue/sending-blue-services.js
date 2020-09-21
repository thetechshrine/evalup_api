const axios = require('axios').default;

const EmailServices = require('../interfaces/email-services');
const validateSendAccountActivationEmailParams = require('../utils/validate-send-account-activation-email-params');
const logger = require('../../logger');
const errorParser = require('../../error_parser');

module.exports = class SendingBlueServices extends EmailServices {
  async sendEmail({ url, to, templateId, replyTo, params } = {}) {
    return axios.post(
      url,
      { to, templateId, replyTo, params },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.SENDING_BLUE_API_KEY,
        },
      }
    );
  }

  async sendAccountActivationEmail({ recipientEmail, recipientFullName, token } = {}) {
    validateSendAccountActivationEmailParams(recipientEmail, recipientFullName, token);

    const transactionalEmailParams = {
      url: 'https://api.sendinblue.com/v3/smtp/email',
      to: [{ email: recipientEmail }],
      templateId: Number.parseInt(process.env.SENDING_BLUE_ACCOUNT_ACTIVATION_TEMPLATE_ID, 10),
      replyTo: { email: process.env.SENDING_BLUE_EMAIL },
      params: {
        recipientFullName: recipientEmail,
        accountActivationLink: `${process.env.FRONT_APP_BASE_URL}/confirmation?token=${token}`,
      },
    };

    try {
      await this.sendEmail(transactionalEmailParams);
      logger.info(`email sent to ${recipientEmail}`);
    } catch (error) {
      let errorMessage = `Error while sending email to ${recipientEmail} : `;
      if (error.response && error.response.data) {
        errorMessage += error.response.data.message;
      }
      logger.error(errorMessage);
      logger.error(errorParser.parseError(error));

      throw new Error(errorMessage);
    }
  }
};
