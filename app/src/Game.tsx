'use client'

import { PlayerProvider } from './PlayerContext';
import { MyStage } from './MyStage';
import { GameProvider } from './GameContext';

export  const Game = () => {


  return (
    <GameProvider>
    <PlayerProvider>
      <h2>PIXI GAME</h2>
      <MyStage/>
    </PlayerProvider>
    </GameProvider>
  );
};
