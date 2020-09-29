import express from 'express';
import { hasSpecialChar, nameExist } from '../utils/validation';

const router = express.Router();

// Validate username of new user.
router.post('/', (req: express.Request, res: express.Response): express.Response => {
  const username: string = req.body.name;

  if (username === '') {
    return res.status(400).json({
      valid: false, msg: 'Empty string is not allowed. Please enter a valid name.',
    });
  }
  if (hasSpecialChar(username)) {
    return res.status(400).json({
      valid: false, msg: 'Special characters are not allowed. Please enter a valid name.',
    });
  }
  if (nameExist(username)) {
    return res.status(400).json({
      valid: false, msg: 'The name is already taken. Try another one.',
    });
  }
  return res.status(200).json({ valid: true, msg: '' });
});

export default router;
