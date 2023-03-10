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
      subject: 'Reestablecer contraseña en Calendario App',
      html: `
        <!DOCTYPE html>
        <html lang="es" style=" box-sizing: border-box; padding: 0; margin: 0;">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reestablecer contraseña</title>
          <style>
            @media screen and (max-width: 450px) {
              img.image__header {
                width: 15rem !important; 
              }
            }
          </style>
        </head>
        <body style="background-image: url(https://zsfpcx.stripocdn.email/content/guids/CABINET_b5bfed0b11252243ebfb1c00df0e3977/images/rectangle_171_3.png); background-size: cover; background-repeat: no-repeat; font-family: Poppins, sans-serif; padding: 3rem 1rem; margin: 0;"
        >
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: calc(100vh - 3rem);">
            <div style="background-color: #1B1B1B; color: aliceblue; max-width: 28rem; border-radius: .5rem; padding: 1rem 2rem;">
        
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; "> <!-- Header -->
                <h1 style="font-size: 1.3rem; text-align: center;">Reestablecer contraseña en Calendar App</h1>
        
                <img class="image__header" style="display: block; object-fit: cover; width: 20rem;" src="https://zsfpcx.stripocdn.email/content/guids/CABINET_9aa36f49cdb5185ad35ee0f7a5c7d9380ade3ae69ada3493ecaa145d1284bee9/images/25469811_developer_male_ICK.png" alt="">
              </div>  <!-- End Header -->
        
              <div style="background-image: url(https://zsfpcx.stripocdn.email/content/guids/CABINET_9aa36f49cdb5185ad35ee0f7a5c7d9380ade3ae69ada3493ecaa145d1284bee9/images/group_347_1.png); background-size: cover; background-position: center; background-repeat: no-repeat; border: .1rem solid #9875FB; border-radius: .5rem; padding: 0 1rem;"> <!-- Body -->
                <p>Estimado/a <span style="font-weight: bold; font-size: 1.3rem;">${name} ,</span></p>
                <p>Hemos recibido su solicitud para reestablecer su contraseña en nuestro sitio web <span style="font-weight: bold; font-size: 1.1rem;">Calendario App</span></p>
                <p>Para continuar con el proceso de reestablecimiento de contraseña, haga click en el siguiente enlace :</p>
        
                <a href="${process.env.FRONT_URI}/auth/confirm/${token}" target="_blank" style="padding: 1rem; text-align: center; display: block; color: #f1f1f1; background-color: #9875FB;text-decoration: none; border-radius: 5rem; margin-bottom: 1rem;">Confirmar Cuenta</a>
              </div>  <!-- End Body -->
        
              <div style="margin-top: 1.5rem; line-height: 1.8;">
                <p style="margin: 0;">Atentamente,</p>
                <p style="font-weight: 700; margin: 0;">El equipo de Calendar App</p>
              </div>
            </div>
        
            <div style="display: flex; flex-direction: column; margin-top: 1.5rem; color: #333333; text-align: center; font-size: .9rem;">
              <small>Si no ha solicitado un reestablecimiento de contraseña, por favor ignore este mensaje.</small>
              <small>Copyright © 2023 <span style="font-weight: 800;">Calendario</span>, Todos los derechos reservados.</small>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`Message sent: ${sendEmail.messageId}`);
  } catch ( error ) {
    console.log(error);
  }
}

export default emailResetPass;