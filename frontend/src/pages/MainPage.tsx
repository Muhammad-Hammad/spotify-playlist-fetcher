import React, { Fragment, useEffect, useState } from 'react';
import SearchForm from '../features/search/SearchForm';
import { searchPlaylists } from '../features/search/searchService';
import SpotifyButton from '../components/SpotifyButton';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import Card from '../components/Card';
import { AudioProvider } from '../context/AudioContext';
import {
  SkeletonGridContainer,
  SkeletonCard,
  SkeletonImage,
  SkeletonContent,
  SkeletonText,
  SkeletonArtist,
  SkeletonDuration,
} from '../components/CardSkeleton';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0.2fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainPage: React.FC = () => {
  const [mode, setMode] = useState('Song Match'); // Default mode
  const [list, setList] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setList([]);
  }, [mode]);

  const handleSearch = async (mode: string, term: string) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('authToken');
      const results: any = await searchPlaylists(mode, term, accessToken);
      setList(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };
  const { logout } = useAuth();
  const handleLogout = () => {
    try {
      logout();
    } catch (e) {
      console.log(e);
    }
  };

  const UIRenderer = () => {
    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SkeletonGridContainer>
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index}>
                <SkeletonImage />
                <SkeletonContent>
                  <SkeletonText style={{ width: '80%' }} />
                  <SkeletonArtist />
                  <SkeletonDuration />
                </SkeletonContent>
              </SkeletonCard>
            ))}
          </SkeletonGridContainer>
        </div>
      );
    }
    if (mode === 'Song Match' || mode === 'Mood Generator') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GridContainer>
            <AudioProvider>
              {list?.tracks?.items?.map((item) => {
                return (
                  <Fragment key={item.uri}>
                    <Card type={item.type} data={item} />
                  </Fragment>
                );
              })}
            </AudioProvider>
          </GridContainer>
        </div>
      );
    }
    if (mode === 'Artist Match') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GridContainer>
            <AudioProvider>
              {list?.artists?.items?.map((item) => {
                return (
                  <Fragment key={item.uri}>
                    <Card type={item.type} data={item} />
                  </Fragment>
                );
              })}
            </AudioProvider>
          </GridContainer>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ position: 'fixed', right: '5px', top: '5px' }}>
        <SpotifyButton onClick={handleLogout} text="Logout" />
      </div>
      <SearchForm
        onSubmit={handleSearch}
        setMode={setMode}
        disabled={loading}
      />
      {UIRenderer()}
    </div>
  );
};

export default MainPage;
