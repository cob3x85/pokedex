import axios from 'axios';
import { Pokemon } from '../../domain/entities/pokemon';
import { pokeApi } from '../../config/api/pokeApi';
import type {
  PokeAPIPaginatedResponse,
  PokeApiPokemon,
} from '../../infrastructure/interfaces/poke-api.interfaces';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?offset=${page * limit}&limit=${limit}`;
    console.log('Fetching Pokemons from URL:', url);
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    console.log('Fetched Pokemons:', data.results.map(p => p.name));

    const pokemonPromises = data.results.map(pokemon => {
      return pokeApi.get<PokeApiPokemon>(pokemon.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);

    const pokemonsPromises =  pokeApiPokemons.map(res =>
      PokemonMapper.pokeApiPokemonToEntity(res.data),
    );

    return await Promise.all(pokemonsPromises);

  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw new Error('Error fetching pokemons');
  }
};
