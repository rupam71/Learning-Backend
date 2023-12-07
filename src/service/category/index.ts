import express, { Router } from 'express';
import * as Controller from "./controller";
import { verifyToken } from '../auth/middleware/varifyToken';
import { adminRoute } from '../auth/middleware/adminRoute';

const router: Router = express.Router();

router.get('/', Controller.getCategory);
router.post('/', verifyToken, adminRoute, Controller.createCategory);
router.patch('/:id', verifyToken, adminRoute, Controller.updateCategory);
router.delete('/:id', verifyToken, adminRoute, Controller.deleteCategory);

export default router;

