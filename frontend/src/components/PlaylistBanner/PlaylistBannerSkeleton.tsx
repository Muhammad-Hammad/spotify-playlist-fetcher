import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Define a shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// Skeleton Loader Styles
const SkeletonContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #121212;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
  padding: 24px;
  max-width: 700px;
  margin: 24px auto;
  color: #ffffff;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  max-width: 250px;
  height: 250px;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    margin-right: 24px;
    margin-bottom: 0;
  }
`;
const SkeletonDetailsContainer = styled.div`
  flex-grow: 1
`

const SkeletonText = styled.div`
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin: 8px 0;
`;

const TitleSkeleton = styled(SkeletonText)`
  height: 28px;
  width: 80%;
  @media (min-width: 768px) {
    width: 60%;
  }
`;

const DescriptionSkeleton = styled(SkeletonText)`
  height: 16px;
  width: 90%;
`;

const InfoSkeleton = styled(SkeletonText)`
  height: 14px;
  width: 70%;
`;

const OwnerSkeleton = styled.div`
  margin-top: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const OwnerImageSkeleton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  margin-bottom: 8px;
  @media (min-width: 768px) {
    margin-right: 12px;
    margin-bottom: 0;
  }
`;

const OwnerNameSkeleton = styled(SkeletonText)`
  height: 16px;
  width: 70%;
`;

const PlayListBannerSkeleton: React.FC = () => (
  <SkeletonContainer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <SkeletonImage />
    <SkeletonDetailsContainer>
      <TitleSkeleton />
      <DescriptionSkeleton />
      <InfoSkeleton />
      <InfoSkeleton />
      <InfoSkeleton />
      <OwnerSkeleton>
        <OwnerImageSkeleton />
        <OwnerNameSkeleton />
      </OwnerSkeleton>
    </SkeletonDetailsContainer>
  </SkeletonContainer>
);

export default PlayListBannerSkeleton;
