import { v2 as cloudinary } from 'cloudinary';

// Configuration is handled by the CLOUDINARY_URL environment variable automatically
// if using cloudinary.config() without arguments, or we can explicitly set it.

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

export default cloudinary;
