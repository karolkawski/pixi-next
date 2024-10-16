'use client';

import { PlayerProvider } from './src/PlayerContext'; 
import { Game } from "./src/Game";

export default function Home() {
  return (
    <PlayerProvider>
      <Game />
    </PlayerProvider>
  );
}
