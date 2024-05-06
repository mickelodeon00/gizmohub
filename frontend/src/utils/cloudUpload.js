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
    return null;
  }
};
