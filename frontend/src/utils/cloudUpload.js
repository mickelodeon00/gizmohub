import axios from 'axios';

export const cloudUpload = async (file, folder) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', `GIZMOHUB/${folder ? folder : 'others'}`);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    const { data: cloudData } = await axios.post(
      process.env.REACT_APP_CLOUDINARY_URL,
      formData
    );
    return cloudData?.secure_url;
  } catch (err) {
    console.error('Error uploading to Cloudinary:', err);
    return null;
  }
};

export const uploadMultipleImages = async (files, folder) => {
  if (files.length === 0) return [];
  try {
    const ImgUrl = await Promise.all(
      files.map((file) => cloudUpload(file, `products/${folder}`))
    );
    return ImgUrl.filter((item) => item !== null);
  } catch (err) {
    console.error('Error uploading multiple images:', err);
    return [];
  }
};
