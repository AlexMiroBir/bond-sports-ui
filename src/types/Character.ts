import {HomeWorld} from "./HomeWorld";

export interface Character {
    id: string,
    name: string,
    height: string,
    mass: string,
    birtYear: string,
    films: number,
    homeWorld: HomeWorld
}
