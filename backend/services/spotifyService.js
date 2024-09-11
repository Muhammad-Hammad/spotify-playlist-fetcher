const axios = require('axios');
const { generateMoodPlaylistName, generatePlaylistNameForSongMatch, generatePlaylistNameForArtistMatch, generateTrackNamesForMoodGenerator, generateTrackNamesForSongMatch, generateTrackNamesForArtistMatch } = require('./openaiService');
const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

const getSpotifyUserProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Spotify user profile:', error);
    throw new Error('Unable to fetch user profile');
  }
};
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

const searchSpotifyTrack = async (accessToken, trackName) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
      params: {
        q: trackName,
        type: 'track',
        limit: 1,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const tracks = response.data.tracks.items;
    return tracks.length > 0 ? tracks[0].uri : null;
  } catch (error) {
    console.error(`Error searching for track "${trackName}":`, error);
    return null;
  }
};

const addTracksToPlaylist = async (accessToken, playlistId, trackUris) => {
  try {
    await axios.post(
      `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`,
      {
        uris: trackUris,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.error('Error adding tracks to playlist:', error);
    throw new Error('Unable to add tracks to playlist');
  }
};

const getPlaylistDetails = async (accessToken, playlistId) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    throw new Error('Unable to fetch playlist');
  }
};
const createPlaylist = async (accessToken, userId, playlistName) => {

  try {
    const response = await axios.post(
      `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists`,
      {
        name: playlistName,
        description: `Playlist generated based on: ${playlistName}`,
        public: false,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating Spotify playlist:', error);
    throw new Error('Unable to create playlist');
  }
};

const getTrackDetails = async (accessToken, trackUri) => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackUri.split(':')[2]}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch track details');
  }
  return response.json();
};

const getArtistDetails = async (accessToken, artistId) => {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch artist details');
  }
  return response.json();
};


const createPlaylistWithTracks = async (userPrompt, accessToken, mode) => {
  try {
    let playlistName;
    let trackNames;

    const userProfile = await getSpotifyUserProfile(accessToken);
    const userId = userProfile.id;

    switch (mode) {
      case 'Mood Generator':
        playlistName = await generateMoodPlaylistName(userPrompt);
        trackNames = await generateTrackNamesForMoodGenerator(playlistName);
        break;
      case 'Song Match':
        playlistName = await generatePlaylistNameForSongMatch(userPrompt);
        trackNames = await generateTrackNamesForSongMatch(playlistName, userPrompt);
        break;
      case 'Artist Match':
        playlistName = await generatePlaylistNameForArtistMatch(userPrompt);
        trackNames = await generateTrackNamesForArtistMatch(playlistName, userPrompt);
        break;
      default:
        throw new Error('Invalid mode');
    }

    const playlist = await createPlaylist(accessToken, userId, playlistName);
    const playlistId = playlist.id;

    const trackUris = [];
    const trackDetailsMap = new Map(); 

    for (const trackName of trackNames) {
      const trackUri = await searchSpotifyTrack(accessToken, trackName);
      if (trackUri) {
        trackUris.push(trackUri);

        const trackDetails = await getTrackDetails(accessToken, trackUri);
        if (trackDetails.artists) {
          const artistImagesMap = new Map();

          await Promise.all(
            trackDetails.artists.map(async (artist) => {
              const artistDetails = await getArtistDetails(accessToken, artist.id);
              if (artistDetails.images && artistDetails.images.length > 0) {
                artistImagesMap.set(artist.id, artistDetails.images.map(img => img.url));
              } else {
                artistImagesMap.set(artist.id, []);
              }
            })
          );

          if (!trackDetailsMap.has(trackUri)) {
            trackDetailsMap.set(trackUri, {
              uri: trackUri,
              name: trackDetails.name,
              artists: trackDetails.artists.map(a => ({
                id: a.id,
                name: a.name,
                images: artistImagesMap.get(a.id) || [],
              })),
            });
          }
        }
      }
      if (trackUris.length >= 10) break;
    }

    await addTracksToPlaylist(accessToken, playlistId, trackUris);

    const updatedPlaylist = await getPlaylistDetails(accessToken, playlistId);
    updatedPlaylist.owner = { ...updatedPlaylist.owner, images: userProfile.images || [] };
    updatedPlaylist.description = decodeHtmlEntities(updatedPlaylist.description);

    updatedPlaylist.tracks.items = updatedPlaylist.tracks.items.map(item => {
      const trackUri = item.track.uri;
      const trackDetails = trackDetailsMap.get(trackUri);
      if (trackDetails) {
        return {
          ...item,
          track: {
            ...item.track,
            artists: trackDetails.artists,
          },
        };
      }
      return item;
    });

    return updatedPlaylist;
  } catch (error) {
    console.error('Error creating playlist with tracks:', error);
    throw new Error('Failed to create playlist with tracks');
  }
};

const decodeHtmlEntities = (str) => {
  return str.replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};

module.exports = {
  searchSpotify,
  createPlaylistWithTracks,
};
