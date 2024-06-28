const sendMail = require("./sendMail");

const TITLE = "Responsive Email Template";
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
module.exports = async (to, name, token, time, from="IAM", ttl="10") => {
  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${TITLE}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
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
            <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #cccccc; background-color: #ECF4D6">
              <!-- Header -->
              <tr>
                <td class="header" style="background-color: #265073; padding: 40px; text-align: center; color: #ECF4D6; font-size: 24px;">
                  <b>${TITLE}</b>
                </td>
              </tr>
                <!-- Body -->
              <tr>
                <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                  <b>Dear ${name},</b>
                  <br/><br/>
                
                  We hope this message finds you well.

                  As part of our ongoing efforts to ensure the security of your account, we are providing you with a One-Time Password rest link generated at: ${time} for secure access. 

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
                      <td align="center" style="background-color: #2D9596; padding: 10px 20px; border-radius: 5px;">
                        <a 
                        id="OTP" 
                        href=${token}
                        target="_blank"
                        style="color: #ECF4D6; text-decoration: none; font-weight: bold; min-width: 150px; font-size: 25px" 
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
                  This OTP is valid for the next ${ttl} and can only be used once. For your security, please do not share this OTP with anyone.

                  <br/><br/><b>
If you did not request this OTP, or if you have any questions or concerns, please contact our support team immediately at ${email_id}.
</b><br/><br/>

                  Thank you for your attention to this important matter.
<br/><br/>

                  <b>Best regards,
                  Team ${APP_NAME}</b>             
                </td>
              </tr>
                <!-- Footer -->
              <tr>
                <td class="footer" style="background-color: #333333; padding: 40px; text-align: center; color: white; font-size: 14px;">
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

  As part of our ongoing efforts to ensure the security of your account, we are providing you with a One-Time Password (OTP) for secure access. Please find your OTP below:

  ${token}

  This OTP is valid for the next ${ttl} and can only be used once. For your security, please do not share this OTP with anyone.

  If you did not request this OTP, or if you have any questions or concerns, please contact our support team immediately at ${email_id}.

  Thank you for your attention to this important matter.

  Best regards,
  Team ${APP_NAME}
`;

  const subject = "Your One-Time Password (OTP) for Secure Access";

  await sendMail(to, subject, textBody, from, htmlBody, true);
};