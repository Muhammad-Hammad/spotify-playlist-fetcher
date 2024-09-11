import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';

export const searchPlaylists = async (
  mode: string,
  term: string,
  accessToken: string,
): Promise<unknown> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-playlist`,
      { mode, term },
      {
        headers: { Authorization: `bearer ${accessToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};
