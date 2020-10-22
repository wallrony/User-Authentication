import express from 'express';
import AuthController from '../data/controllers/AuthController';
import UserController from './../data/controllers/UserController';

const router = express.Router();

router.all('*', AuthController.authenticate);

router.get('/users', UserController.show);
router.post('/register', UserController.add);
router.post('/login', AuthController.login);

export default router;