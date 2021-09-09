import Mailgen, { ContentBody } from "mailgen";
import getConfig from "next/config";
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

let {
  serverRuntimeConfig: { smtp, appEnv, product },
} = getConfig();

declare global {
  // noinspection ES6ConvertVarToLetConst,JSUnusedGlobalSymbols
  var nodemailer: {
    transporter: Mail<SMTPTransport.SentMessageInfo> | null;
  };
}

let cached = global.nodemailer;

if (!cached) {
  cached = global.nodemailer = { transporter: null };
}

const isProd = appEnv === "production";

export default async function sendMail(
  to: string,
  subject: string,
  content: ContentBody
) {
  if (!cached.transporter) {
    if (!isProd) {
      const testAccount = await createTestAccount();
      smtp = {
        from: `Majapi <${testAccount.user}>`,
        server: {
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        },
      };
    }

    cached.transporter = createTransport(smtp.server);
  }

  const mailGenerator = new Mailgen({
    theme: "cerberus",
    product,
  });

  const emailBody = mailGenerator.generate({ body: content });
  const emailText = mailGenerator.generatePlaintext({ body: content });

  const info = await cached.transporter.sendMail({
    from: smtp.from,
    to,
    subject,
    text: emailText,
    html: emailBody,
  });

  if (!isProd) {
    console.info("Message sent: %s", info.messageId);
    console.info("Preview URL: %s", getTestMessageUrl(info));
  }
}
