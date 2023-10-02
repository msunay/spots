import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { FlatList } from 'react-native';
// import { Text, View } from ''

export default function NotFoundScreen() {

  const navigation = useNavigation();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>{`This screen doesn't exist. ${navigation.getState().routes}`}</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{`${navigation.getState().routes[0].key}`}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
