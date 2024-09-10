const express = require('express');
const { searchSongs } = require('../controllers/spotifyController');
const router = express.Router();
const crypto = require('crypto');
const axios = require('axios');
const request = require('request');
const {
  spotifyAccessTokenMiddleware,
} = require('../middlewares/spotifyMiddleware');

router.post('/search', spotifyAccessTokenMiddleware, searchSongs);



const stateKey = 'spotify_auth_state';
const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString('hex').slice(0, length);
};
router.get('/auth/spotify', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const queryParams = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.REDIRECT_URI,
    state: state,
    scope: 'user-read-private user-read-email user-read-playback-state',
    show_dialog: true,
  }).toString();

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// Callback route for Spotify login
router.post('/callback', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
      }).toString(),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const { access_token, refresh_token } = response.data;
    return res.status(200).json({ access_token, refresh_token });
  } catch (error) {
    console.error('Error exchanging code for token', error);
    res.redirect(`${process.env.FRONTEND_URI}/error?error=invalid_token`);
  }
});

router.get('/refresh_token', function (req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        new Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;
      res.send({
        access_token: access_token,
        refresh_token: refresh_token,
      });
    }
  });
});

router.post('/logout', async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    // Revoke the Spotify access token
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    if (response.data.error) {
      return res.status(400).json({ error: 'Failed to revoke token' });
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
