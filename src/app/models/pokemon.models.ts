export interface Pokemon{
    name: string;
    url: string;
}
export interface PokemonWithImage{
    pokemon: Pokemon;
    img: string;
}

export interface PokemonRawData{
    results: Array<Pokemon>;
}