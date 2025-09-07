import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, View } from 'react-native';
import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui/PokeBallBg';
import { Text } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const {
    data: pokemons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        ListHeaderComponent={() => <Text variant='displaySmall'>Pokédex</Text>}
        numColumns={2}
        style={{
          paddingTop: top + 20,
        }}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
