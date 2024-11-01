import { useEffect, useRef } from "react";
import { Sprite, useTick } from "@pixi/react";
import { Sprite as PixiSprite } from "pixi.js";
import { gsap } from "gsap";
import { IPlayerProps } from "../types/Player.d";

export const Bunny = ({
  speed,
  playerPosition,
  targetCoin,
  coins,
  collectCoin,
}: IPlayerProps) => {
  const bunnyUrl = "https://pixijs.io/pixi-react/img/bunny.png";

  const bunnyRef = useRef<PixiSprite>(null);
  const currentPosition = useRef({ ...playerPosition });

  useEffect(() => {
    const collectingMargin = 10;
    currentPosition.current = { ...playerPosition }; 
    if (bunnyRef.current && targetCoin !== null) {
      gsap.to(bunnyRef.current, {
        x: playerPosition.x,
        y: playerPosition.y,
        duration: 0.5, 
        ease: "power1.out", 
        onUpdate: () => {},
        onComplete: () => {
          const coin = coins[targetCoin];
          console.log("🚀 ~ useEffect ~ coin:", coin);
          if (coin) {
            if (
              coin.x - collectingMargin <= bunnyRef.current.x &&
              bunnyRef.current.x <= coin.x + collectingMargin &&
              coin.y - collectingMargin <= bunnyRef.current.y &&
              bunnyRef.current.y <= coin.y + collectingMargin
            ) {

              collectCoin(targetCoin);
            }
          }
        },
      });
    }
  }, [targetCoin]);

  useTick((delta) => {
    if (bunnyRef.current) {
      const dx = playerPosition.x - bunnyRef.current.x;
      const dy = playerPosition.y - bunnyRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 1) {
        bunnyRef.current.x += (dx / distance) * speed * delta; 
        bunnyRef.current.y += (dy / distance) * speed * delta; 
      }
    }
  });

  return (
    <Sprite
      ref={bunnyRef} 
      image={bunnyUrl}
      x={currentPosition.current.x} 
      y={currentPosition.current.y} 
      anchor={0.5}
    />
  );
};
