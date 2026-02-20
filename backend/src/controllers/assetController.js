import * as assetService from '../services/assetService.js';
import cloudinary from '../config/cloudinary.js';

export const uploadAsset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const asset = await assetService.createAssetService(req.file, req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: 'Asset uploaded successfully',
      asset
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
  }
};

export const getPublicAssets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await assetService.getPublicAssetsService(page, limit);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error('Fetch public assets error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch public assets' });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await assetService.getMyAssetsService(req.user._id, page, limit);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error('Fetch my assets error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch your assets' });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const assetId = req.params.id;
    const asset = await assetService.getAssetDetails(assetId);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    if (asset.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Delete from Cloudinary if we have a public_id (stored in url or separate field)
    // Extract public_id from URL if not stored separately
    const publicId = asset.url.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId, { resource_type: asset.type });

    await assetService.deleteAssetRecord(assetId, req.user._id);

    res.status(200).json({ success: true, message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Delete asset error:', error);
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};
