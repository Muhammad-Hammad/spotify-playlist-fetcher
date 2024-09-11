// Card.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

type CardProps = {
  data: any;
};

const CardContainer = styled(motion.div)`
  background-color: #121212; /* Spotify dark background */
  border-radius: 8px;
  overflow: hidden;
  width: 220px; /* Slightly wider for better layout */
  padding: 10px;
  color: #ffffff;
  font-family: 'Circular Std', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; /* Spotify-like font */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

const Content = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Name = styled.h3`
  font-size: 18px;
  margin: 0;
  line-height: 1.2;
`;

const ArtistNames = styled.div`
  margin: 0;
`;

const ArtistName = styled.p`
  font-size: 14px;
  color: #b3b3b3;
  margin: 0 0 4px 8px;
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ArtistAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: -10px;
  z-index: 1;
  border: 2px solid #121212; /* Add border to make it more pronounced */
`;

const Duration = styled.p`
  font-size: 12px;
  color: #b3b3b3;
  margin: 0;
`;

const AudioPreviewButton = styled.button`
  background-color: #1db954; /* Spotify green */
  color: #ffffff;
  border: none;
  border-radius: 50px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 10px;
  align-self: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1ed760; /* Slightly lighter green */
  }
`;

const Card: React.FC<CardProps> = ({ data }) => {
  const animationProps = {
    whileHover: { scale: 1.05 },
  };
  const [, setCurrentTrack] = useState<string | null>(null);
  const { audio, setAudio, stopAudio, isPlaying, setIsPlaying } = useAudio();

  useEffect(() => {
    return () => {
      if (audio && audio.src === data.preview_url) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio, data.preview_url]);

  const handlePlayPreview = () => {
    if (audio) {
      if (audio.src === data.preview_url) {
        if (isPlaying) {
          audio.pause();
          audio.currentTime = 0;
          setIsPlaying(false);
        } else {
          audio.play();
          setIsPlaying(true);
        }
      } else {
        stopAudio();
        const newAudio = new Audio(data.preview_url);
        setAudio(newAudio);
        setCurrentTrack(data.preview_url);
        newAudio.play();
        setIsPlaying(true);
      }
    } else {
      const newAudio = new Audio(data.preview_url);
      setAudio(newAudio);
      setCurrentTrack(data.preview_url);
      newAudio.play();
      setIsPlaying(true);
    }
  };

  return (
    <CardContainer {...animationProps}>
      {data.preview_url && (
        <AudioPreviewButton onClick={handlePlayPreview}>
          {isPlaying && audio?.src === data.preview_url
            ? 'Pause Preview'
            : 'Play Preview'}
        </AudioPreviewButton>
      )}
      <PreviewImage src={data.album.images?.[0]?.url} alt={data.name} />
      <Content>
        <Name>{data?.name}</Name>
        <ArtistNames>
          <AvatarContainer>
            {data?.artists.map((artist: any, index: number) => (
              <ArtistAvatar
                key={artist.id}
                src={artist?.images?.[0]}
                alt={artist.name}
                style={{ zIndex: data.artists.length - index }}
              />
            ))}
          </AvatarContainer>
          <ArtistName>{formatArtists(data.artists)}</ArtistName>
        </ArtistNames>
        <Duration>{formatDuration(data.duration_ms)}</Duration>
      </Content>
    </CardContainer>
  );
};

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function formatArtists(artists: { name: string }[]): string {
  if (artists.length === 0) return 'Unknown Artist';
  if (artists.length === 1) return artists[0].name;
  return artists.map((artist) => artist.name).join(', ');
}

export default Card;
