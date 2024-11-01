import { ICoin } from "./Coin.d"

export interface IPlayer {
    x: number,
    y: number
}

export interface IPlayerProps {
    speed: number
    playerPosition: IPlayer
    targetCoin: number | null
    coins: ICoin[]
    collectCoin: (index: number) => void

}