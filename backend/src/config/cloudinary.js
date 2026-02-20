import { v2 as cloudinary } from 'cloudinary';

// Cloudinary automatically reads CLOUDINARY_URL from process.env
// if it's defined. No explicit config({cloudinary_url: ...}) is needed.

export default cloudinary;
