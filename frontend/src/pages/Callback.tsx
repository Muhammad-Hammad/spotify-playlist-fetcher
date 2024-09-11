import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/callback`, { code })
        .then((response) => {
          const { access_token, refresh_token } = response.data;

          const authChannel = new BroadcastChannel('auth');
          authChannel.postMessage({
            type: 'SPOTIFY_AUTH_SUCCESS',
            auth: true,
          });
          localStorage.setItem('authToken', access_token);
          localStorage.setItem('refreshToken', refresh_token);
          window.close();
        })
        .catch((error) => {
          console.error('Failed to handle Spotify callback:', error);
        });
    }
  }, [navigate]);

  return <h2>Logging you in...</h2>;
};

export default CallbackPage;
