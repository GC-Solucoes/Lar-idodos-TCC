'use strict'


const Email = use("App/Models/Email");
const env = require("../../Email/env");
//Env.get('MAIL_USERNAME', 'MAIL_PASSWORD', 'SMTP_HOST');

class EmailController {
    async store ({ request, response, auth }) {


    const {nome, email,telefone, mensagem} = request.all();

  const mensagemEmail = `
    Enviado por: ${email} Contato: ${telefone}
    ${mensagem}
    `

    //nodemailer
    const nodemailer = require("nodemailer");

    // if (!nome || !email || !mensagem) {
    //   return res.status(400).send("Campo Inválido")
    // }


  const transporter = nodemailer.createTransport({  // Configura os parâmetros de conexão com servidor.
    host: 'mail.tc2code.com.br',
      port: 465,
      // server: 'Gmail',
      secure: true,
      auth: {
         user: env.emailContact,
         pass: env.passwordMailer
        // user: 'gabriel.coimbra@tc2code.com.br',
        // pass: 'tc2code@123'
      }
  });


    //composição email
    const mailOptions = {
      // from: 'gabriel.coimbra@tc2code.com.br',
      // to:'gabriel.coimbra@tc2code.com.br',
      from:env.emailContact,
      to:env.emailContact,
      subject: `${nome} entrou em contato`,
      text: mensagemEmail
    };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email Enviado:' + info.response);
      return response.status(200).send("Email Enviado com Sucesso");
    }
  });


  // transporter.sendMail({
  //   from:env.emailContact,
  //   to: env.emailContact,
  //   subject:"Teste Envio ",
  //   text:"Olá som, testando, 123"
  // }).then(message=>{
  //   console.log(message);
  // });
    }
}

 module.exports = EmailController
