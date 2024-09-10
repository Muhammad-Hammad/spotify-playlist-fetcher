import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';

export const loginWithSpotify = async (): Promise<void> => {
  try {
    const url = `${import.meta.env.VITE_SPOTIFY_AUTHORIZE_URL}?client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REDIRECT_URI)}&scope=${encodeURIComponent(import.meta.env.VITE_SPOTIFY_SCOPES)}`;

    // Open the Spotify login URL in a popup
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      url,
      'Spotify Login',
      `width=${width},height=${height},top=${top},left=${left}`,
    );
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
export const logoutWithSpotify = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      await axios.post(`${API_BASE_URL}/logout`, { refreshToken });

      localStorage.removeItem('refreshToken');
    }
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
