import { useState } from "react";
import { Sprite, useTick } from "@pixi/react";
import { IEnemyProps } from "../types/Enemy.d";

export const Enemy = ({
  index,
  initialX,
  initialY,
  playerPosition,
  onAttack,
}: IEnemyProps) => {
  const enemyUrl = "https://pixijs.com/assets/eggHead.png";
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const speed = Math.random() * 2;
  const collectingMargin = 10;

  useTick(() => {
    const dx = playerPosition.x - x;
    const dy = playerPosition.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      const normalizedDX = (dx / distance) * speed;
      const normalizedDY = (dy / distance) * speed;
      setX((prevX) => prevX + normalizedDX);
      setY((prevY) => prevY + normalizedDY);

      if (
        x - collectingMargin <= playerPosition.x &&
        playerPosition.x <= x + collectingMargin &&
        y - collectingMargin <= playerPosition.y &&
        playerPosition.y <= y + collectingMargin
      ) {
        console.log("can attack");
        onAttack(index);
      }
    }
  });

  return <Sprite image={enemyUrl} x={x} y={y} anchor={0.5} scale={0.3} />;
};
