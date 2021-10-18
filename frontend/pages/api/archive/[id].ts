import type { NextApiHandler } from 'next';
import * as firebase from 'util/firebase';

async function validateCode(id: string, code: string, window: number): Promise<boolean> {
  const otp = await firebase.getOTP(id);

  for (let i = 0; i < window; i++) {
    if (otp.generate({ timestamp: Date.now() - otp.period * 1000 * i }) === code) {
      return true;
    }
  }
  return false;
}

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  if (req.method == 'POST') {
    firebase.init();
    
    const { code } = JSON.parse(req.body);
    if (await validateCode(id, code, 2)) {
      res.status(200).send(await firebase.getMessages(id));
    } else {
      res.status(401).end();
    }
  } else {
    res.status(405).end();
  }
};

export default handler;
