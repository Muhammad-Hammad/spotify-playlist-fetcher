// components/SpotifyButton.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonContainer = styled(motion.button)`
  display: flex;
  align-items: center;
  background-color: #1db954; /* Spotify Green */
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1ed760; /* Slightly lighter green on hover */
  }

  &:active {
    background-color: #1aa34a; /* Even lighter green on click */
  }
`;

const SpotifyButton: React.FC<{ onClick: () => void; text: string }> = ({
  onClick,
  text = 'Login with Spotify',
}) => {
  return (
    <ButtonContainer
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <i
        className="fa-brands fa-spotify"
        style={{ marginRight: '8px', fontSize: '24px' }}
      />
      {text}
    </ButtonContainer>
  );
};

export default SpotifyButton;
