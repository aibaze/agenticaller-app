import axios from 'axios';

import { IMAGE_API_KEY, IMAGE_API_URL } from 'src/config-global';

export const uploadPhoto = async (image) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const url = `${IMAGE_API_URL}?key=${IMAGE_API_KEY}`;
    const formData = new FormData();
    formData.append('image', image);

    const response = await axios.post(url, formData, config);
    return { image: response.data.data.url, thumb: response.data.data.thumb.url };
  } catch (error) {
    console.log(error);
  }
};
