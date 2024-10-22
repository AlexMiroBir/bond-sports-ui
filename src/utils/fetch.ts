import {HomeWorld} from "../types/HomeWorld";
import {Character} from "../types/Character";


export const fetchHomeWorld = async (url: string): Promise<HomeWorld> => {
    const response = await fetch(url);
    const data = await response.json();

    return {
        name: data.name,
        terrain: data.terrain,
        climate: data.climate,
        population: data.population,
    };
}

export const mapApiDataToPeople = async (apiData: any): Promise<Character> => {
    const homeWorld = await fetchHomeWorld(apiData.homeworld);

    return {
        id: apiData.url.match(/\/(\d+)\/$/)[1],
        name: apiData.name,
        height: (apiData.height/100).toString(),
        mass: apiData.mass,
        birtYear: apiData.birth_year,
        films: apiData.films.length,
        homeWorld,
    };
}

export const transformApiData = async (apiArray: any[]) => {
    const transformedData: Character[] = await Promise.all(
        apiArray.map((person) => mapApiDataToPeople(person))
    );
    console.log(transformedData);
    return transformedData
}

