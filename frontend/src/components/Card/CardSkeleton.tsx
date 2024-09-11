import styled from 'styled-components';

// Skeleton Loader Container
const SkeletonGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0.2fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 2fr;
  }
`;

// Skeleton Card
const SkeletonCard = styled.div`
  background: #333; // Dark background for the skeleton
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  height: 300px; // Adjust to match card height
  padding: 5px;
  color: #fff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  cursor: default;

  // Apply a shimmer effect
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

// Skeleton Image
const SkeletonImage = styled.div`
  width: 100%;
  height: 200px; // Adjust to match card image height
  background: #444;
`;

// Skeleton Content
const SkeletonContent = styled.div`
  padding: 12px 16px;
`;

// Skeleton Text
const SkeletonText = styled.div`
  background: #444;
  height: 16px; // Adjust text height
  margin-bottom: 8px;
  border-radius: 4px;
`;

// Skeleton Artist
const SkeletonArtist = styled(SkeletonText)`
  width: 60%;
`;

// Skeleton Duration
const SkeletonDuration = styled(SkeletonText)`
  width: 40%;
`;

export {
  SkeletonArtist,
  SkeletonCard,
  SkeletonContent,
  SkeletonDuration,
  SkeletonGridContainer,
  SkeletonImage,
  SkeletonText,
};
