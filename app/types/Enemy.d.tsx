import { IPlayer } from "./Player.d";

export interface IEnemy {
    x: number,
    y: number
}

export interface IEnemyProps {
  index: number;
  initialX: number;
  initialY: number;
  playerPosition: IPlayer;
  onAttack: (index: number) => void; 
}