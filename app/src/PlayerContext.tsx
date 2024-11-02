
import React, { createContext, useContext, useState, ReactNode } from 'react';

type PlayerState = {
  playerPosition: { x: number; y: number };
  lives: number;
  setPlayerPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
};



const defaultPlayerState: PlayerState = {
  playerPosition: { x: 400, y: 300 },
  lives: 100,
  setPlayerPosition: () => {},
  setLives: () => {},
};

const PlayerContext = createContext<PlayerState>(defaultPlayerState);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [lives, setLives] = useState(3);

  return (
    <PlayerContext.Provider value={{ playerPosition, setPlayerPosition, lives, setLives}}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  return context;
};
