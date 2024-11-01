import { Sprite } from "@pixi/react";
import { useEffect } from "react";
import { ICoinProps } from "../types/Coin.d";

export const Coin = ({ getCoinID, index, x, y, selected, playerPosition }: ICoinProps) => {
  const coinUrl = `https://pixijs.io/pixi-react/img/coin.png`;

  useEffect(()=> {
      const collectingMargin = 10

      if (x - collectingMargin <= playerPosition.x && playerPosition.x <= x + collectingMargin) {
        if (y - collectingMargin <= playerPosition.y && playerPosition.y <= y + collectingMargin) {
          getCoinID(index)
        }
      }

   }, [playerPosition])

  return (
    <>
      {selected ? <></> : <Sprite
        image={coinUrl}
        x={x}
        y={y}
        anchor={0.5}
        scale={0.1}
      />}
    </>
  );
};
