import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  getPokemonNamesWithId,
  getPokemonsByIds,
} from '../../../actions/pokemons';
import { globalTheme } from '../../../config/theme/global-theme';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebounceValue } from '../../hooks/useDebounceValue';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const { debouncedValue } = useDebounceValue(term, 500);

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(debouncedValue))) {
      const pokemon = pokemonNameList.find(
        pokemon => pokemon.id === Number(debouncedValue),
      );
      return pokemon ? [pokemon] : [];
    }

    if (debouncedValue.length === 0) return [];
    if (debouncedValue.length < 3) return [];

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(debouncedValue.toLowerCase()),
    );
  }, [debouncedValue, pokemonNameList]);

  const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () => getPokemonsByIds(pokemonNameIdList.map(p => p.id)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
      <TextInput
        placeholder="Buscar Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={text => setTerm(text)}
        value={term}
      />

      {isLoadingPokemons && (
        <ActivityIndicator style={{ marginTop: 20 }} size={50} color="grey" />
      )}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        ListFooterComponent={<View style={{height:120}} />}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: top + 20,
        }}
      />
    </View>
  );
};
