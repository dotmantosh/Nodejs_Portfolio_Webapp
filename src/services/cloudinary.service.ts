import cloudinary, { UploadApiResponse } from 'cloudinary'
import dotenv from 'dotenv'

// Configure Cloudinary with your credentials
dotenv.config()
// console.log(process.env.CLOUDINARY_CLOUD_NAME)
// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const UploadPreset = {
  ProfilePicture: 'mpw_profile_pictures',
  ProjectPicture: 'mpw_project_pictures',
  ResumePDF: 'mpw_resumes'
}

// Upload image to Cloudinary
export const uploadImage = async (base64String: string, uploadPreset: string): Promise<UploadApiResponse> => {
  try {
    const result = await cloudinary.v2.uploader.upload(base64String, { upload_preset: uploadPreset });
    return result;
  } catch (error) {
    console.log(error)
    throw new Error('Error uploading image');
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Error deleting image');
  }
};

export const uploadPDF = async (base64String: string, uploadPreset: string): Promise<UploadApiResponse> => {
  try {
    if (!base64String.startsWith('data:application/pdf;base64,')) {
      base64String = `data:application/pdf;base64,${base64String}`;
    }
    const result = await cloudinary.v2.uploader.upload(base64String, {
      upload_preset: uploadPreset,
      // resource_type: 'raw' // Specify the resource type as 'raw' for non-image files
    });
    // console.log(result)
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error uploading PDF');
  }
};

// Delete PDF from Cloudinary
export const deletePDF = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'raw' });
  } catch (error) {
    throw new Error('Error deleting PDF');
  }
};

