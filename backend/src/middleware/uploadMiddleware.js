import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const fileType = file.mimetype.split('/')[0]; // 'image' or 'video'
    
    return {
      folder: 'creator_connect/assets',
      resource_type: fileType === 'video' ? 'video' : 'image',
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'mov', 'avi'],
      transformation: fileType === 'image' ? [{ width: 1000, height: 1000, crop: 'limit' }] : [],
    };
  },
});

const upload = multer({ storage: storage });

export default upload;
