import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const router = Router();

router.post('/register', passport.authenticate('register', {session: false}), async (req, res) => {
    console.log(req.body);
    res.send({status: 'ok'});
});

router.post('/login', passport.authenticate('login', {session: false}), async (req, res) => {
    const loginUser = {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    }
    const token = jwt.sign(loginUser, config.jwt.SECRET, {expiresIn: 300});
    res.cookie(config.jwt.COOKIE, token, {maxAge: 300000, httpOnly: true}).send({status: 'logged in'});
});

router.get('/current', (req, res) => {
    try {
        const token = req.cookies[config.jwt.COOKIE];
        if (!token) return res.redirect('/');
        const user = jwt.verify(token, config.jwt.SECRET);
        res.send({status: 'success', user})
    } catch (error) {
        if (error.expiredAt) {
            res.send({status: 'error', error: 'Expired token'})
        }
    }
})

export default router;