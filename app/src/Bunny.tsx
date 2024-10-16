import { Sprite, useTick } from "@pixi/react";
import { useEffect, useState } from "react";
import { usePlayer } from "./PlayerContext";

  export const Bunny = ({speed}) => {
    const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
    const { playerPosition, setPlayerPosition, lives, setLives, points, setPoints, enemies, setEnemies, coins, setCoins } = usePlayer();

    const [x, setX] = useState(playerPosition.x);
    const [y, setY] = useState(playerPosition.y);
    const [xEnd, setXEnd] = useState(playerPosition.x);
    const [yEnd, setYEnd] = useState(playerPosition.y);
  

    useTick(delta => {
      const dx = xEnd - x;
      const dy = yEnd - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setPlayerPosition({x, y})

      if (distance > speed) {
        const normalizedDX = (dx / distance) * speed;
        const normalizedDY = (dy / distance) * speed;

        setX(prevX => prevX + normalizedDX);
        setY(prevY => prevY + normalizedDY);
      } else {
        setX(xEnd);
        setY(yEnd);
        
      }

    });

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        event.preventDefault(); 
        setXEnd(event.clientX); 
        setYEnd(event.clientY);
      };

      window.addEventListener('click', handleClick);
      return () => {
        window.removeEventListener('click', handleClick);
      };
    }, []);

    return (
      <Sprite
        image={bunnyUrl}
        x={x}
        y={y}
        anchor={0.5}
        scale={1.3}
      />
    );
  }