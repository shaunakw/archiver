import * as admin from 'firebase-admin';
import type { NextApiHandler } from 'next';
import { TOTP } from 'otpauth';

function initFirebase() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    });
  }
}

const otp = new TOTP({ secret: process.env.OTP_SECRET });

function validateCode(code: string): boolean {
  return otp.generate() === code;
}

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  if (req.method == 'POST') {
    const body = JSON.parse(req.body);
    if (process.env.NODE_ENV === 'development' || validateCode(body.code)) {
      initFirebase();

      const query = await admin.firestore().collection(id).orderBy('timestamp', 'desc').get();
      const messages = query.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      res.status(200).send(messages);
    } else {
      res.status(401).end();
    }
  } else {
    res.status(405).end();
  }
};

export default handler;
