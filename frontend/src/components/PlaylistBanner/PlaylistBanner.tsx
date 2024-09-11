import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Helper function to format duration from milliseconds
const formatDuration = (durationMs: number) => {
  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

interface PlaylistBannerProps {
  playlist: {
    name: string;
    description: string;
    followers: { total: number };
    images: { url: string }[];
    public: boolean;
    tracks: {
      items: { track: { duration_ms: number; name: string; type: 'track' } }[];
    };
    type: 'playlist';
    owner: { display_name: string; images: { url: string }[] };
  };
}

// Styled components
const BannerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #121212; /* Spotify dark background */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
  padding: 24px;
  max-width: 700px;
  margin: 24px auto;
  color: #ffffff; /* White text for contrast */
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const PlaylistImage = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    margin-right: 24px;
    margin-bottom: 0;
  }
`;

const Details = styled.div`
  flex: 1;
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  margin: 8px 0;
  color: #b3b3b3; /* Light grey for description */
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Info = styled.div`
  margin: 8px 0;
  font-size: 14px;
  color: #b3b3b3; /* Light grey for other information */
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const OwnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const OwnerImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 8px;
  border: 2px solid #1db954; /* Spotify green border for owner image */
  @media (min-width: 768px) {
    margin-right: 12px;
    margin-bottom: 0;
  }
`;

const OwnerName = styled.span`
  font-size: 14px;
  font-weight: 500;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

// PlaylistBanner Component
const PlaylistBanner: React.FC<PlaylistBannerProps> = ({ playlist }) => {
  const playlistImage =
    playlist?.images?.length > 0
      ? playlist?.images?.[0]?.url
      : 'https://via.placeholder.com/160';
  const ownerImage =
    playlist?.owner?.images?.length > 0
      ? playlist?.owner?.images?.[0]?.url
      : 'https://via.placeholder.com/40';

  const totalTracks = playlist?.tracks?.items?.length;
  const totalDurationMs = playlist?.tracks?.items?.reduce(
    (acc, { track }) => acc + track?.duration_ms,
    0,
  );
  const formattedDuration = formatDuration(totalDurationMs);

  return (
    <BannerContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PlaylistImage src={playlistImage} alt={playlist?.name} />
      <Details>
        <Title>{playlist?.name}</Title>
        <Description>{playlist?.description}</Description>
        <Info>
          {totalTracks} songs, {formattedDuration}
        </Info>
        <Info>{playlist?.public ? 'Public Playlist' : 'Private Playlist'}</Info>
        <Info>{playlist?.followers?.total} followers</Info>
        <OwnerContainer>
          <OwnerImage src={ownerImage} alt={playlist?.owner?.display_name} />
          <OwnerName>{playlist?.owner?.display_name}</OwnerName>
        </OwnerContainer>
      </Details>
    </BannerContainer>
  );
};

export default PlaylistBanner;
