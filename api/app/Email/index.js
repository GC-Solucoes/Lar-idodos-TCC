
const nodemailer = require("nodemailer");
export const env = require('./env');



// const transporter = nodemailer.createTransport({
//   host: 'mail.tc2code.com.br',
//     port: 465,
//     // server: 'Gmail',
//     secure: true,
//     auth: {
//       user: env.emailContact,
//       pass: env.passwordMailer
//     }
// });

// transporter.sendMail({
//   from:env.emailContact,
//   to: env.emailContact,
//   subject:"Teste Envio ",
//   text:"Olá som, testando, 123"
// }).then(message=>{
//   console.log(message);
// });


