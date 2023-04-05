import registerUser from '../validator/user/registerUser.js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import admin from '../firebase.js';

export default {
  register: async (req, res) => {
    //validate the user input
    const validationResult = registerUser.validate(req.body);

    if (validationResult.error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          error: validationResult.error.message,
          message: ReasonPhrases.BAD_REQUEST,
        });
    }
    const { username, email, password } = req.body;

    try {
      const userRecord = await admin.auth().createUser({
        username,
        email,
        password,
      });

      const userClaim = { admin: true };
      const adminEmails = 'ilirmemeti@luliflex.com';
      if (adminEmails === userRecord.email) {
        admin.auth().setCustomUserClaims(userRecord.uid, userClaim);
        admin.firestore().collection('roles').doc(userRecord.uid).set({
          email: userRecord.email,
          role: userClaim,
        });
      } else {
        admin.auth().setCustomUserClaims(userRecord.uid, { admin: false });
        admin.firestore().collection('roles').doc(userRecord.uid).set({
          email: userRecord.email,
          role: { admin: false },
        });
      }
      await admin.auth().generateEmailVerificationLink(userRecord.email);


      return res.json({ user: userRecord.toJSON() });
    } catch (err) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: err.message, message: ReasonPhrases.FORBIDDEN });
    }
  },
};
