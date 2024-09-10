// Card.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

type CardProps = {
  type: 'track';
  data: any;
};

const CardContainer = styled(motion.div)`
  background-color: #181818;
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  padding: 5px;
  color: #fff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 12px 16px;
`;

const Name = styled.h3`
  font-size: 16px;
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

const ArtistName = styled.p`
  font-size: 14px;
  color: #b3b3b3;
  margin: 0 0 4px 0;
`;

const Duration = styled.p`
  font-size: 12px;
  color: #b3b3b3;
  margin: 0;
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const GenreBadge = styled.span`
  background-color: #282828;
  color: #fff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 6px;
  margin-bottom: 6px;
`;

const AudioPreviewButton = styled.button`
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #14833b;
  }
`;

const Card: React.FC<CardProps> = ({ type, data }) => {
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
        stopAudio(); // Stop any currently playing audio
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

  if (type === 'track') {
    const trackData = data;
    return (
      <CardContainer {...animationProps}>
        {data.preview_url && (
          <AudioPreviewButton onClick={handlePlayPreview}>
            {isPlaying && audio?.src === data.preview_url
              ? 'Pause Preview'
              : 'Play Preview'}
          </AudioPreviewButton>
        )}
        <Content>
          <Name>{trackData.name}</Name>
          <ArtistName>{formatArtists(trackData?.artists)}</ArtistName>
          <Duration>{formatDuration(trackData.duration_ms)}</Duration>
        </Content>
      </CardContainer>
    );
  } else if (type === 'artist') {
    const artistData = data;
    return (
      <CardContainer {...animationProps}>
        {artistData.images.length ? (
          <PreviewImage
            src={artistData.images?.[0]?.url}
            alt={artistData.name}
          />
        ) : null}
        <Content>
          <Name>{artistData.name}</Name>
          {artistData.genres && artistData.genres.length > 0 && (
            <Genres>
              {artistData.genres.map((genre) => (
                <GenreBadge key={genre}>{genre}</GenreBadge>
              ))}
            </Genres>
          )}
        </Content>
      </CardContainer>
    );
  }
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
