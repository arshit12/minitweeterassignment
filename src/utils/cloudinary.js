import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const uploadImage = async (path) => {
    try {
        if(!path) return null;
        await cloudinary.uploader.upload(path,{
            resource_type: "auto",
        });
        console.log("Image uploaded successfully",response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(path);
        return null;
    }
  }
export default uploadImage;