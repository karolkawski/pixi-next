
import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameState = {
  playerPosition: { x: number; y: number };
  lives: number;
  points: number;
  setPlayerPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  enemies: unknown[],
  coins: unknown[],
  setCoins:  React.Dispatch<React.SetStateAction<unknown>>;
  setEnemies:  React.Dispatch<React.SetStateAction<unknown>>;

};

const getRandomPosition = (width, height) => {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  return { x, y };
}


const defaultGameState: GameState = {
  playerPosition: { x: 400, y: 300 },
  lives: 3,
  points: 0,
  setPlayerPosition: () => {},
  setLives: () => {},
  setPoints: () => {},
  enemies: [],
  coins: [],
  setCoins: () => {},
  setEnemies:() => {},
};

const PlayerContext = createContext<GameState | undefined>(defaultGameState);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [coins, setCoins] = useState(Array.from({ length: 5 }, () => getRandomPosition(800, 600)));
  const [enemies, setEnemies] = useState(Array.from({ length: 3 }, () => getRandomPosition(800, 600)));



  return (
    <PlayerContext.Provider value={{ playerPosition, setPlayerPosition, lives, setLives, points, setPoints, coins, setCoins, enemies, setEnemies  }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  return context;
};
