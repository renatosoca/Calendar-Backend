import nodemailer from 'nodemailer';

const emailResetPass = async ( payload ) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    const { email, name, token } = payload;

    const sendEmail = await transporter.sendMail({
      from: '"Foo 👻" <admin@calendar.com>',
      to: email,
      subject: 'Recuperar Contraseña',
      html: `
        <p>Hola ${name}, parece que solicitaste reestablecer la contraseña de tu cuenta de Calendar </p>
        <p>Para establecer una nueva contraseña, solo tienes que seguir el siguiente enlace:
        <a href="${process.env.FRONT_URI}/reset/${token}" target="_black">Reestablecer Contraseña</a></p>
        
        <p>Si tu no solicitó reestablecer su contraseña, puedes ignorar este mensaje</p>
      `,
    });
    console.log(`Message sent: ${sendEmail.messageId}`);
  } catch ( error ) {
    console.log(error);
  }
}

export default emailResetPass;