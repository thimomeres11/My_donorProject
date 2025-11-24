const admin = require('firebase-admin');

// Load file service account
const serviceAccount = require('./firebase-admin/serviceAccountKey.json');

// Inisialisasi admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mydonorprojek-default-rtdb.firebaseio.com',
});

// Ambil semua user dari Firebase Auth
async function restoreUsers() {
  const db = admin.database();

  console.log('Mengambil data users dari Firebase Auth...');

  const users = await admin.auth().listUsers();

  console.log(`Total user ditemukan: ${users.users.length}`);

  for (const u of users.users) {
    const userRef = db.ref('users/' + u.uid);

    await userRef.set({
      uid: u.uid,
      email: u.email,
      phone: u.phoneNumber || '',
      createdAt: new Date().toISOString(),
      dob: '',
    });

    console.log(`✔ User berhasil disimpan: ${u.email}`);
  }

  console.log('Selesai! Semua user sudah dimasukkan ke Realtime Database.');
}

restoreUsers();
