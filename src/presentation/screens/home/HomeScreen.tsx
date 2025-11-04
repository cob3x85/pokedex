import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, View } from 'react-native';
import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui/PokeBallBg';
import { FAB, Text, useTheme } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/StackNavigator';

type Props = StackScreenProps<RootStackParams, 'HomeScreen'> & {};

export const HomeScreen = ({ navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const theme = useTheme();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam);
      // Pre-fetch individual pokemon data
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });
      return pokemons;
    },
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length;
    },
    staleTime: 1000 * 60 * 60, // 1 hour


  });

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

      <FAB
        label='Buscar'
        mode="elevated"
        style={[globalTheme.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.dark ? 'black' : 'white'}

        onPress={() => navigation.push('SearchScreen')}
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
