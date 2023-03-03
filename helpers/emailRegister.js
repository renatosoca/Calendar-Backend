import nodemailer from 'nodemailer';

const emailRegister = async ( payload ) => {
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
      subject: 'Registro de usuario',
      html: `
        <p>Hola ${name}, comprueba tu cuenta en Calendar</p>
        <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONT_URI}/confirm/${token}" target="_black">Confirmar Cuenta</a></p>
        
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      `,
    });
    console.log(`Message sent: ${sendEmail.messageId}`);
  } catch ( error ) {
    console.log(error);
  }
}

export default emailRegister;