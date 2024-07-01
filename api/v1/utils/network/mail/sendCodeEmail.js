const sendMail = require("./sendMail");
const getTime = require("../../string/getTime");

const APP_NAME = process.env.APP_NAME;
const email_id = process.env.SYSTEM_EMAIL;

/**
 * This function will send the otp to the recipient with the 
 * provided token.
 * @param {*} to 
 * @param {*} name 
 * @param {*} token 
 * @param {*} time 
 * @param {*} from 
 * @param {*} ttl 
 */
module.exports = async (to, name, token, time, from="IAM", title = "Password Change Notification", ttl="10", ttlUnit="m") => {
  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en" style="background-color: #ccc">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet">
      <style>
      @media screen and (max-width: 600px) {
        .content {
          width: 100% !important;
          display: block !important;
          padding: 10px !important;
        }
        .header, .body, .footer {
          padding: 20px !important;
        }
      }
      </style>
    </head>
    <body style="font-family: 'Poppins', Arial, sans-serif">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding: 20px;">
            <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #fff">
              <!-- Header -->
              <tr>
                <td class="header" style="background-color: #333; padding: 40px; text-align: center; color: #fff; font-size: 24px">
                  <b>${title}</b>
                </td>
              </tr>
                <!-- Body -->
              <tr>
                <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                  <b>Dear ${name},</b>
                  <br/><br/>
                
                  We hope this message finds you well.

                  As part of our ongoing efforts to ensure the security of your account, we are providing you with a Password rest link generated at: <b>${time}</b> for secure access. 

                <br/><br/>
                <strong> 
                    Please find your password reset link below: 
                </strong>           
                </td>
              </tr>
                <!-- Call to action Button -->
              <tr>
                <td style="padding: 0px 40px 0px 40px; text-align: center;">
                  <!-- CTA Button -->
                  <table cellspacing="0" cellpadding="0" style="margin: auto;">
                    <tr>
                      <td align="center" style="background-color: #333; padding: 10px 20px; border-radius: 5px;">
                        <a 
                        id="OTP" 
                        href=${token}
                        target="_blank"
                        style="color: #fff; text-decoration: none; font-weight: bold; min-width: 150px; font-size: 25px" 
                        >
                          Click Here To Reset Your Password
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                  This password reset link is valid for the next ${getTime(ttl)} and can only be used once. For your security, please do not share this link with anyone.

                  <br/><br/><b>
If you did not request this Link, or if you have any questions or concerns, please contact our support team immediately at ${email_id}.
</b><br/><br/>

                  Thank you for your attention to this important matter.
<br/><br/>

                  <b>Best regards,
                  Team ${APP_NAME}</b>             
                </td>
              </tr>
                <!-- Footer -->
              <tr>
                <td class="footer" style="background-color: #333; padding: 40px; text-align: center; color: white; font-size: 14px;">
                Copyright &copy; 2024 | ${APP_NAME}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
  const textBody = `
  Dear [Recipient's Name],

  We hope this message finds you well.

  As part of our ongoing efforts to ensure the security of your account, we are providing you with a Password rest link generated at: ${time} for secure access. 

  Please find your password reset link below: 

  ${token}

  This password reset link is valid for the next ${ttl} and can only be used once. For your security, please do not share this link with anyone.

  If you did not request this Link, or if you have any questions or concerns, please contact our support team immediately at ${email_id}.

  Thank you for your attention to this important matter.

  Best regards,
  Team ${APP_NAME}
`;

  const subject = "Your Password Reset Link for Secure Access";

  await sendMail(to, subject, textBody, from, htmlBody, true);
};