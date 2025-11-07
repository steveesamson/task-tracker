import express from 'express';
import { userService } from "../services/index.js";
import { Encrypt, Token } from '../security/index.js';
import { deriveErrorMessage } from '../utils/index.js';


const router = express.Router();

router.post('/login', async (req, res) => {

    try {
        const { userId, password } = req.body;

        const user = await userService.findByUserId(userId);

        if (!user) {
            return res.status(401).json({ error: 'Wrong login credentials.' });
        }
        const { password: storedPassword } = user;
        delete user.password;
        const passwordMatches = await Encrypt.verify(password, storedPassword);

        if (!passwordMatches) {
            return res.status(400).json({ error: 'Invalid login credentials.' });
        }

        const payload = {
            id: user.id,
            userId: userId,
            name: user.full_name,
        };
        const jwt = Token.sign(payload);
        const { name } = payload;
        res.status(200).json({ data: { key: jwt, user: { name, userId } } });
    } catch (e) {
        const err = deriveErrorMessage(e);
        console.error(err);
        res.status(400).json({ error: "Unable to log you in." });
    }
});

router.post('/', async (req, res) => {

    try {
        const { userId, password } = req.body;
        const encPassword = await Encrypt.hash(password);
        const user = await userService.addUser({ userId, password: encPassword });
        res.status(200).json({ data: user });
    } catch (e) {
        console.error(e);
        const err = e instanceof Error ? e.message : e.toString();
        if (err.includes("duplicate key")) {
            return res.status(400).json({ error: "User with same Email Address already exists." });
        }
        res.status(400).json({ error: "Unable to add user." });
    }
});


export default router;
