'use client'

import { PlayerProvider } from './PlayerContext';
import { MyStage } from './MyStage';

export  const Game = () => {

  return (
    <PlayerProvider>
      <h2>PIXI GAME</h2>
      <MyStage/>
    </PlayerProvider>
  );
};
