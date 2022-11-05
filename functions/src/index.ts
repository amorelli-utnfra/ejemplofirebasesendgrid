const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();
const SENGRID_API_KEY = functions.config().sendgrid.key;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENGRID_API_KEY);


exports.firestoreSendMail = functions.firestore
    .document('users/{userId}')
    .onCreate( (event:any) => {
            const userId = event.id;
            const db = admin.firestore();
            return db.collection('users').doc(userId)
                .get()
                .then((doc: any) => {
                    const user = doc.data();
              
                    const msg = {
                        to: user.mail,
                        from: 'duenolacomanda@gmail.com',
                        subject: 'Bienvenido',
                        html: `<p>Bienvenido</p> <br> <a href='{url de la function validar usuario}}/validarUsuario?id=${userId}'> Click aca para validar.</a>`
                    }
                    return sgMail.send(msg);
                });
        }
    );

exports.validarUsuario = functions.https.onRequest(async (req: any, res: any) => {

    const db = admin.firestore();

     db.collection("users").doc(req.query.id).update("state", "Activo").then((data: any) => {
        return  res.send("correo validado exitosamente!");

    }).catch((data: any) => {
        return false;
    });

});