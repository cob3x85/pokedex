import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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
    data,
    isLoading,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: (params) => getPokemons(params.pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length;
    },
    staleTime: 1000 * 60 * 60, // 1 hour

  });

  console.log({ data });
  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() || []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        numColumns={2}
        style={{
          paddingTop: top + 20,
        }}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
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
