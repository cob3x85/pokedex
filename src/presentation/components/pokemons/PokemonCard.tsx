import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pokemon } from '../../../domain/entities/pokemon';
import { RootStackParams } from '../../navigator/StackNavigator';
import { FadeInImage } from '../ui/FadeInImage';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { top } = useSafeAreaInsets();

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        navigation.navigate('PokemonScreen', { pokemonId: pokemon?.id });
      }}
    >
      <Card style={[styles.cardContainer, {backgroundColor: pokemon?.color }]}>
        <Text style={styles.name} lineBreakMode="middle" variant="bodyLarge">
          {pokemon?.name}
          {'\n#' + pokemon?.id}
        </Text>

        {/* Pokeball background image */}
        <View style={styles.pokeballContainer}>
          <Image
            source={require('../../../assets/pokeball-light.png')}
            style={styles.pokeball}
            onError={e => console.log('Pokeball image error:', e.nativeEvent)}
          />
        </View>

        {/* Pokemon Image */}
        <FadeInImage    
          uri={pokemon.avatar}
          style={styles.pokemonImage}
        />

        {/* Types */}
        <Text style={[styles.name, { marginTop: 35 }]}>
          {pokemon?.types && pokemon.types[0]}
        </Text>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
});
