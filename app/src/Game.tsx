import { useState } from "react";
import { usePlayer } from "./PlayerContext";
import { Container, Stage, Text, useTick } from "@pixi/react";
import { Bunny } from "./Bunny";
import { Enemy } from "./Enemy";
import { Coin } from "./Coin";



export const GameContainer = () => {
    const { 
    playerPosition, 
    setPlayerPosition, 
    lives, 
    setLives, 
    points, 
    setPoints, 
    enemies, 
    setEnemies, 
    coins, 
    setCoins 
  } = usePlayer();
    console.log("🚀 ~ GameContainer ~ coins:", coins)
    
    useTick(() => {
    coins.forEach((coin, index) => {
      const distanceX = Math.abs(playerPosition.x - coin.x);
      const distanceY = Math.abs(playerPosition.y - coin.y);

      if (distanceX < 20 && distanceY < 20) {
        setPoints(prevPoints => prevPoints + 1);
        setCoins(prevCoins => prevCoins.filter((_, i) => i !== index));
      }
    });

    enemies.forEach(({ x: enemyX, y: enemyY }) => {
      const distanceX = Math.abs(playerPosition.x - enemyX);
      const distanceY = Math.abs(playerPosition.y - enemyY);

      if (distanceX < 20 && distanceY < 20) {
        console.log('Hit by enemy!');
        setLives(prevLives => {
          if (prevLives > 1) {
            return prevLives - 1;
          } else {
            // setGameOver(true); 
            return 0;
          }
        });
      }
    });
  });

  return(<Container>
          <Text 
        text={`HP: ${lives}`}
        x={50} 
        y={570} 
        anchor={0.5} 
      />
      <Text 
        text={`Points: ${points}`} 
        x={730} 
        y={570} 
        anchor={0.5} 
      />
  </Container>)
}

export  const Game = () => {
  console.log('RENDER GAME');
  const speed = 7;
  const [gameOver, setGameOver] = useState(false);
  const { 
    playerPosition, 
    setPlayerPosition, 
    lives, 
    setLives, 
    points, 
    setPoints, 
    enemies, 
    setEnemies, 
    coins, 
    setCoins 
  } = usePlayer();
    console.log("🚀 ~ Game ~ coins:", coins)

  return (
    <Stage width={800} height={600} options={{ backgroundColor: 0x10bb99 }}>
      {coins.map((coin, index) => (
        <Coin key={index} x={coin.x} y={coin.y} />
      ))}
      {enemies.map((enemy, index) => (
        <Enemy key={index} initialX={enemy.x} initialY={enemy.y} />
      ))}
      <Bunny speed={speed} />
      {gameOver && (
        <Text 
          text="Game Over!" 
          x={400} 
          y={300} 
          anchor={0.5}
        />
      )}
    <GameContainer/>
    </Stage>
  );
};
