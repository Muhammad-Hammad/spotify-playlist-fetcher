/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_SPOTIFY_AUTHORIZE_URL: string;
  readonly VITE_SPOTIFY_SCOPES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
