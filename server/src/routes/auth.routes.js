import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.js';
import { signupSchema, loginSchema } from '../validators/auth.schema.js'

const router = Router();

router.post('/signup', validateSchema(signupSchema), authCtrl.signup);
router.post('/login', validateSchema(loginSchema), authCtrl.login);
router.post('/logout', authCtrl.logout);
router.get('/verifyToken', authCtrl.verifyToken);
router.get('/profile', authRequired, authCtrl.profile); // Ruta protegida


export default router;