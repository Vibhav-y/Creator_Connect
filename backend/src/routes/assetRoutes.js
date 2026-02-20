import express from 'express';
import * as assetController from '../controllers/assetController.js';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Apply authentication to all asset routes
router.use(protect);

// Routes
router.get('/public', assetController.getPublicAssets);
router.post('/upload', upload.single('file'), assetController.uploadAsset);
router.get('/my-assets', assetController.getMyAssets);
router.delete('/:id', assetController.deleteAsset);

export default router;
