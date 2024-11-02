import React, { createContext, useContext, useState, ReactNode } from "react";
import { ICoin } from "../types/Coin.d";
import { IEnemy } from "../types/Enemy.d";

type GameState = {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  enemies: IEnemy[];
  coins: ICoin[];
  setCoins: React.Dispatch<React.SetStateAction<ICoin[]>>;
  setEnemies: React.Dispatch<React.SetStateAction<IEnemy[]>>;
};

const getRandomPosition = (width: number, height: number) => {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  return { x, y };
};

const defaultGameState: GameState = {
  points: 0,
  enemies: [],
  coins: [],
  setCoins: () => {},
  setPoints: () => {},
  setEnemies: () => {},
};

const GameContext = createContext<GameState>(defaultGameState);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);
  const [coins, setCoins] = useState<ICoin[]>(
    Array.from({ length: 5 }, () => {
      return { ...getRandomPosition(800, 600), selected: false };
    })
  );
  const [enemies, setEnemies] = useState<IEnemy[]>(
    Array.from({ length: 3 }, () => {
      return { ...getRandomPosition(800, 600), selected: false };
    })
  );

  return (
    <GameContext.Provider
      value={{
        points,
        setPoints,
        coins,
        setCoins,
        enemies,
        setEnemies,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  return context;
};
