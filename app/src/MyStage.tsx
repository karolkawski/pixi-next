import { Stage, Text } from "@pixi/react";
import { Bunny } from "./Bunny";
import { Enemy } from "./Enemy";
import { Coin } from "./Coin";
import { usePlayer } from "./PlayerContext";
import { useEffect, useState } from "react";
import { ICoin } from "../types/Coin.d";
import { IEnemy } from "../types/Enemy.d";

export const MyStage = () => {
  const { playerPosition, setPlayerPosition, coins, setCoins, lives, setLives, points, setPoints, enemies } = usePlayer();
  const [targetCoin, setTargetCoin] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const collectCoin = (index: number) => {
   setPoints(prevPoints => prevPoints + 1);
    setCoins((prevCoins: ICoin[]) =>
        [...prevCoins, prevCoins[index].selected = true]
    );
    setTargetCoin(null); 
  };

  const getCoinID = (index: number) => {
    setTargetCoin(index); 
  };
  const handleClick = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = event.nativeEvent;

    const newPosition = {
      x: clientX - event.currentTarget.getBoundingClientRect().left,
      y: clientY - event.currentTarget.getBoundingClientRect().top,
    };

    console.log(`Clicked position: x=${newPosition.x}, y=${newPosition.y}`);
    setPlayerPosition(newPosition); 
  };


  const handleEnemyAttack = (): void => {
    setLives(lives -1 )
  }

  useEffect(() => {
    if (lives <= 0) {
        setGameOver(true)
    };

  }, [lives])

  return (
    <Stage
      width={800}
      height={600}
      options={{ backgroundColor: 0x10bb99 }}
      onPointerDown={handleClick}
    >
      {gameOver ? (
        <>
          <Text text={`GAME OVER`} x={300} y={300} />
          <Text text={`Points: ${points}`} x={20} y={550} />
        </>

      ) : (
        <>
          {coins.map((coin, index) => (
            <Coin
              getCoinID={getCoinID}
              key={index}
              index={index}
              x={coin.x}
              y={coin.y}
              selected={coin.selected}
              playerPosition={playerPosition}
              collectCoin={collectCoin}
            />
          ))}
          {enemies.map((enemy: IEnemy, index: number) => (
            <Enemy
              index={index}
              key={index}
              initialX={enemy.x}
              initialY={enemy.y}
              playerPosition={playerPosition}
              onAttack={handleEnemyAttack}
            />
          ))}
          <Bunny
            coins={coins}
            speed={5}
            playerPosition={playerPosition}
            targetCoin={targetCoin}
            collectCoin={collectCoin}
          />
          <Text
            text={`Position: (${Math.round(playerPosition.x)}, ${Math.round(
              playerPosition.y
            )})`}
            x={20}
            y={50}
          />
          <Text text={`Points: ${points}`} x={20} y={550} />
          <Text text={`HP: ${lives}`} x={150} y={550} />
        </>
      )}
    </Stage>
  );
};
