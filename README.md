
# Spotify Playlist Generator using OpenAI and Spotify API

This project allows users to log in with their Spotify account and generate personalized playlists based on a prompt and category selected. Users can search for moods, songs, or artists, and the app uses OpenAI and the Spotify Web API to create a playlist and display details, including song previews.

## Features

- **Spotify OAuth Login**: Users can log in via Spotify.
- **OpenAI Integration**: Generates playlists based on user-provided prompts.
- **Three Playlist Categories**: 
  - **Mood Generator**: Create playlists based on moods.
  - **Song Match**: Find songs matching a particular query.
  - **Artist Match**: Generate playlists of similar artists.
- **Spotify Web API**: Creates and retrieves playlist details and song previews directly on Spotify.


![image](https://github.com/user-attachments/assets/8170d956-464b-4da3-baac-f3ff1e18edd3)


## Tech Stack

### Frontend

- **React** with **TypeScript**: Used for building the UI.
- **Context API**: For managing global state across components.
- **React Router**: For client-side routing.
- **Styled Components**: For styling the components.
- **Framer Motion**: For animations.

### Backend

- **NodeJS** with **ExpressJS**: Backend API handling requests.
- **OpenAI API**: Generates playlist suggestions based on user prompts.
- **Spotify Web API**: Handles playlist creation and fetching song details.

## Getting Started

### Prerequisites

- Node.js (version 16 or above)
- Spotify Developer Account (to get OAuth credentials)
- OpenAI API Key

### Spotify OAuth Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login).
2. Create a new application and set the redirect URI to match your local setup or deployment.
3. Copy your **Client ID** and **Client Secret** for use in the backend.

Note: in development environment, you have to add email and full name in spotify web api project dashboard otherwise it won't work.

### OpenAI API Setup

1. Get your OpenAI API Key from [OpenAI](https://platform.openai.com/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Muhammad-Hammad/spotify-playlist-fetcher.git
   ```

2. Navigate to the project directory:

   ```bash
   cd spotify-playlist-fetcher
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   # For the frontend
   cd frontend
   npm install

   # For the backend
   cd ../backend
   npm install
   ```

4. Create environment files:

   - **Frontend**: Create `.env` in the frontend directory and set the following:
     ```plaintext
      VITE_API_BASE_URL=
      VITE_SPOTIFY_CLIENT_ID= 
      VITE_REDIRECT_URI=
      VITE_SPOTIFY_AUTHORIZE_URL= https://accounts.spotify.com/authorize
      VITE_SPOTIFY_SCOPES = user-read-private user-read-email user-modify-playback-state playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative user-library-modify user-library-read streaming app-remote-control
      VITE_SPOTIFY_BASE_URL= https://api.spotify.com/v1
     ```

   - **Backend**: Create `.env` in the backend directory and set the following:
     ```plaintext
     SPOTIFY_CLIENT_ID=
     SPOTIFY_CLIENT_SECRET=
     REDIRECT_URI=
     FRONTEND_URI=
     OPENAI_API_KEY=
     PORT=



     ```

### Running the Project

#### Frontend

To start the frontend:

```bash
npm run dev
```


#### Backend

To start the backend:

```bash
npm start
```


### Spotify API Configuration

## Usage

1. **Login**: Navigate to the login page and sign in with your Spotify account.
2. **Select a Category**: Choose between `Mood Generator`, `Song Match`, or `Artist Match`.
3. **Enter a Prompt**: Provide a prompt based on the category selected.
4. **Generate Playlist**: The app sends the prompt to OpenAI, creates a playlist on your Spotify account, and displays the playlist with song details and previews.

## API Routes

- **POST /create-playlist**: Sends a prompt to OpenAI and generates a playlist based on the selected category.

## Future Improvements

- Add more playlist categories.
- Provide deeper playlist customization options.
- Improve error handling for Spotify OAuth and API rate limits.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](./issues).

---

**Developed by Hammad Ghani**
