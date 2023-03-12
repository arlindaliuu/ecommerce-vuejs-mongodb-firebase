import admin from 'firebase-admin'

import serviceAccount from '../credentials/e-commerce-d7663-firebase-adminsdk-yyssb-c9f4804954.json' assert {type: 'json'}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
export default admin;