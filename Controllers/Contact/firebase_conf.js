const admin = require("firebase-admin");

const serviceAccount = require("../../project1-6a660-firebase-adminsdk-fjf9f-be3c118bf2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project1-6a660-default-rtdb.firebaseio.com/"
});

module.exports = admin;