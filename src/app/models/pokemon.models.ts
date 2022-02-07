//A basic interface used when fetching a list of pokemon that is used as a property of a bigger interface.
export interface Pokemon{
    name: string;
    url: string;
}

//The interface used to store pokemon in its service and on the localStorage, that includes more information than its property, the other pokemon-interface.
export interface PokemonWithImage{
    pokemon: Pokemon;
    img: string;
    id: number;
    collected: boolean;
}

//An interface used to handle the fetch of Pokemon from the API, they are sent as a JSON-object containing an array called "results" which this interface is made to mirror.
export interface PokemonRawData{
    results: Array<Pokemon>;
}