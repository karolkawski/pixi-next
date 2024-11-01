
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ICoin } from '../types/Coin.d';
import { IEnemy } from '../types/Enemy.d';

type GameState = {
  playerPosition: { x: number; y: number };
  lives: number;
  points: number;
  setPlayerPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  enemies: IEnemy[],
  coins: ICoin[],
  setCoins:  React.Dispatch<React.SetStateAction<unknown>>;
  setEnemies:  React.Dispatch<React.SetStateAction<unknown>>;

};

const getRandomPosition = (width: number, height: number) => {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  return { x, y };
}


const defaultGameState: GameState = {
  playerPosition: { x: 400, y: 300 },
  lives: 100,
  points: 0,
  setPlayerPosition: () => {},
  setLives: () => {},
  setPoints: () => {},
  enemies: [],
  coins: [],
  setCoins: () => {},
  setEnemies:() => {},
};

const PlayerContext = createContext<GameState>(defaultGameState);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [coins, setCoins] = useState<ICoin[]>(Array.from({ length: 5 }, () => { return{...getRandomPosition(800, 600), selected: false}}));
  const [enemies, setEnemies] = useState<IEnemy[]>(Array.from({ length: 3 }, () =>{ return{...getRandomPosition(800, 600), selected: false}}));

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
