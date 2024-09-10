const spotifyAccessTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
      return res.status(401).json({ error: 'No access token provided' });
    }
    req.spotifyAccessToken = token;
    next();
  } catch (error) {
    console.error('Error in Spotify access token middleware:', error);
    return res
      .status(500)
      .json({ error: 'Could not authenticate with Spotify' });
  }
};

module.exports = {
  spotifyAccessTokenMiddleware,
};
