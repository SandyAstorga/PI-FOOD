// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Ruta al archivo de credenciales de Firebase Admin SDK

// Inicializa Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Inicializa Firestore
const db = admin.firestore();

// Exporta Firestore configurado
module.exports = db;
