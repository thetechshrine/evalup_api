const nodemailer = require('nodemailer');
const consolidate = require('consolidate');
const path = require('path');

const EmailServices = require('../interfaces/email-services');
const validateSendAccountActivationEmailParams = require('../utils/validate-send-account-activation-email-params');

module.exports = class NodeMailerServices extends EmailServices {
  configNodeMailerTransport() {
    return nodemailer.createTransport({
      host: 'SSL0.OVH.NET',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });
  }

  async sendEmail(to, subject, html) {
    const transporter = this.configNodeMailerTransport();

    return transporter.sendMail({
      from: '"SAMAPP" <no-reply@samapp.com>',
      to,
      subject,
      html,
    });
  }

  async compileTemplateToHtml(fileName, data) {
    const filePath = path.join(__dirname, 'templates', `${fileName}.ejs`);
    return consolidate.ejs(filePath, data);
  }

  async sendAccountActivationEmail({ recipientEmail, recipientFullName, token }) {
    validateSendAccountActivationEmailParams(recipientEmail, recipientFullName, token);

    const html = await this.compileTemplateToHtml('account-activation', {
      recipientFullName,
      activationLink: `${process.env.FRONT_APP_BASE_URL}${this.FRONT_APP_ACCOUNT_VALIDATION_PATH}?token=${token}`,
    });

    return this.sendEmail(recipientEmail, 'Confirmation du compte', html);
  }
};
