const { searchSpotify, createPlaylistWithTracks,  } = require('../services/spotifyService');
const { determineMood } = require('../services/openaiService');

const searchSongs = async (req, res) => {
  const { mode, term } = req.body;

  if (!mode || !term) {
    return res
      .status(400)
      .json({ error: 'Mode and searchString are required' });
  }

  try {
    let finalSearchString = term;
    if (mode === 'Mood Generator') {
      finalSearchString = await determineMood(term);
      console.log(`Mood translated to: ${finalSearchString}`);
    }
    const result = await searchSpotify(
      req.spotifyAccessToken,
      mode,
      finalSearchString,
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createPlaylistController = async (req, res) => {
  const { term, mode } = req.body;

  try {
    // Validate input
    if (!term || !mode) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create the playlist with tracks
    const playlist = await createPlaylistWithTracks(term, req.spotifyAccessToken, mode);
    return res.status(200).json(playlist);
  } catch (error) {
    console.error('Error in createPlaylistController:', error);
    return res.status(500).json({ error: 'Failed to create playlist' });
  }
};

module.exports = {
  searchSongs,
  createPlaylistController,
};
