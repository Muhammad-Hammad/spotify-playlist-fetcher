import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 


:root {
  --background-gradient: linear-gradient(180deg, #282828, #121212); /* Gradient from gray (#282828) to black (#121212) */
  --primary-color: #1db954;    /* Spotify's primary green color */
  --secondary-background-color: #191414; /* Slightly lighter dark background */
  --text-color: #ffffff;       /* White text color for contrast */
  --placeholder-color: #b3b3b3; /* Light grey for placeholders */
  --border-color: #333;        /* Border color for inputs and buttons */
  --font-family: 'Spotify Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* Default font stack */
}

/* Apply theme colors to the body and root elements */
body {
  background: var(--background-gradient);
  color: var(--text-color);
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
  min-height: 100vh; /* Ensure the background covers the full viewport height */
  display: flex;
  flex-direction: column;
}

/* Input and button styles */
input,
button {
  border-color: var(--border-color);
  background-color: var(--secondary-background-color);
  color: var(--text-color);
}

input::placeholder {
  color: var(--placeholder-color);
}

/* Button specific styles */
button {
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1ed760; /* Slightly lighter green for hover effect */
}
  
`;

export default GlobalStyle;
