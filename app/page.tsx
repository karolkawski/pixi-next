'use client'

import { Sprite, Stage, useTick, Text } from "@pixi/react"; 
import { useEffect, useState } from "react";

const getRandomPosition = (width, height) => {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  return { x, y };
}

const enemies = Array.from({ length: 3 }, () => getRandomPosition(800, 600));
const coins = Array.from({ length: 5 }, () => getRandomPosition(800, 600)); 

export default function Home() {
  
  let i = 0;
  const speed = 7;
  const [lives, setLives] = useState(3); 
  const [gameOver, setGameOver] = useState(false); 
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 300 });

  const Bunny = () => {
    const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
    const [x, setX] = useState(playerPosition.x);
    const [y, setY] = useState(playerPosition.y);
    const [xEnd, setXEnd] = useState(playerPosition.x);
    const [yEnd, setYEnd] = useState(playerPosition.y);
    
    useTick(delta => {
      const dx = xEnd - x;
      const dy = yEnd - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > speed) {
        const normalizedDX = (dx / distance) * speed;
        const normalizedDY = (dy / distance) * speed;


         setPlayerPosition({ x, y });

        coins.forEach((coin, index) => {
          if (
            x >= coin.x - 15 && x <= coin.x + 15 &&
            y >= coin.y - 15 && y <= coin.y + 15
          ) {
            console.log('COIN +1');
            coins.splice(index, 1);
          }
        });



        enemies.forEach(({ x: enemyX, y: enemyY }) => {
          if (
            x >= enemyX - 15 && x <= enemyX + 15 &&
            y >= enemyY - 15 && y <= enemyY + 15
          ) {
            console.log('Hit by enemy!');
            setLives(prevLives => {
              if (prevLives > 1) {
                return prevLives - 1;
              } else {
                setGameOver(true); 
                return 0;
              }
            });
          }
        });

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

  const Enemy = ({ playerPosition, initialX, initialY }) => {
    const enemyUrl = 'https://pixijs.com/assets/eggHead.png';
    const [x, setX] = useState(initialX); 
    const [y, setY] = useState(initialY); 

    useTick(() => {
      const dx = playerPosition.x - x;
      const dy = playerPosition.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        const normalizedDX = (dx / distance) * speed/2;
        const normalizedDY = (dy / distance) * speed/2;

        setX(prevX => prevX + normalizedDX);
        setY(prevY => prevY + normalizedDY);
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

  const Coin = ({x, y}) => {
    const coinUrl = `https://pixijs.io/pixi-react/img/coin.png`;

    return (
      <Sprite
        image={coinUrl}
        x={x}
        y={y}
        anchor={0.5}
        scale={0.1}
      />
    );
  }


  return (
    <Stage width={800} height={600} options={{ backgroundColor: 0x10bb99 }}>
        {coins.map((coin, index) => (
        <Coin key={index} x={coin.x} y={coin.y} />
      ))}
      {enemies.map((enemy, index) => (
        <Enemy key={index} playerPosition={playerPosition} initialX={enemy.x} initialY={enemy.y} />
      ))}
      <Bunny />
      {gameOver && (
        <Text 
          text="Game Over!" 
          x={400} 
          y={300} 
          anchor={0.5} 
          style={{ fill: 'white', fontSize: 36 }}
        />)}

        <Text 
          text={`HP: ${lives}`}
          x={50} 
          y={570} 
          anchor={0.5} 
          style={{ fill: 'white', fontSize: 26 }}
        />

        <Text 
          text={`Points: ${0}`}
          x={730} 
          y={570} 
          anchor={0.5} 
          style={{ fill: 'white', fontSize: 26 }}
        />
    </Stage>
  );
}
