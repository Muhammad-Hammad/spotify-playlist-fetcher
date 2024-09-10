const axios = require('axios');
const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search';

// Function to search tracks, artists, or moods
async function searchSpotify(accessToken, mode, searchString) {
  try {
    console.log('accessToken', accessToken);
    let queryParam = '';
    if (mode === 'Song Match' || mode === 'Mood Generator') {
      queryParam = `track:${searchString}`;
    } else if (mode === 'Artist Match') {
      queryParam = `artist:${searchString}`;
    } else {
      throw new Error('Invalid mode');
    }

    console.log('queryParam', queryParam);

    const response = await axios.get(
      `${SPOTIFY_SEARCH_URL}?q=${queryParam}&type=track,artist&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error searching Spotify', error);
    return error;
  }
}

module.exports = {
  searchSpotify,
};
