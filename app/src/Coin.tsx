import { Sprite } from "@pixi/react";

export const Coin = ({ x, y }) => {
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
};
