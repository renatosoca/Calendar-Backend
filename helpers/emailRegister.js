import nodemailer from 'nodemailer';

const emailRegister = async ( payload ) => {
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
    from: 'admin@calendar.com',
    to: email,
    subject: 'Registro de usuario',
  })
}