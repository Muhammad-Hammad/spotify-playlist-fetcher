const { searchSpotify } = require('../services/spotifyService');
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

module.exports = {
  searchSongs,
};
