import { IPlayer } from "./Player.d"

export interface ICoin {
    x: number,
    y: number,
    selected: boolean
}

export interface ICoinProps {
    getCoinID: (index: number) => void
    index:number
    x:number
    y: number
    selected: boolean
    playerPosition: IPlayer
    collectCoin: (index:  number) => void
}
