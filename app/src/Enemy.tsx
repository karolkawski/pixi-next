import { useState } from "react";
import { usePlayer } from "./PlayerContext";
import { Sprite, useTick } from "@pixi/react";

export   const Enemy = ({ initialX, initialY }) => {
    const enemyUrl = 'https://pixijs.com/assets/eggHead.png';
    const { playerPosition } = usePlayer();
    const [x, setX] = useState(initialX); 
    const [y, setY] = useState(initialY); 
    const speed = 2; 

    useTick(() => {
      const dx = playerPosition.x - x;
      const dy = playerPosition.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        const normalizedDX = (dx / distance) * speed;
        const normalizedDY = (dy / distance) * speed;
        // setX(prevX => prevX + normalizedDX);
        // setY(prevY => prevY + normalizedDY);
      }
    });

    return (
      <Sprite
        image={enemyUrl}
        x={x}
        y={y}
        anchor={0.5}
        scale={0.3}
      />
    );
  }
  