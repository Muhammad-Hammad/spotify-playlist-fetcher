// AudioContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AudioContextProps {
  audio: HTMLAudioElement | null;
  setAudio: (audio: HTMLAudioElement | null) => void;
  stopAudio: () => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;

}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
      setIsPlaying(false);
    }
  };


  useEffect(() => {
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        setAudio(null);
      };

      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audio]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  return (
    <AudioContext.Provider
      value={{ audio, setAudio, stopAudio, isPlaying, setIsPlaying }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextProps => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
