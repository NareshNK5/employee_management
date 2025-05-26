import axios from 'axios';

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem('refresh');

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      refresh,
    });

    const newAccessToken = response.data.access;
    localStorage.setItem('access', newAccessToken);
    return newAccessToken;

  } catch (error) {
    console.error("Refresh token invalid or expired", error);
    return null;
  }
};
