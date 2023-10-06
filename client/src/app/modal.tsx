import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useGetOneSpotQuery } from '../services/api-service';
import { LocationPin } from '../Types';
import { Image } from 'expo-image';
import images from '../config/images';
import { FlatList } from 'react-native';
import ContentLoader from 'react-content-loader/native'
import {
  Ellipse,
  Path
} from 'react-native-svg';

export default function ModalScreen() {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();

  const [selectedSpot, setSelectedSpot] = useState<LocationPin>({} as LocationPin);
  const [spotImages, setSpotImages] = useState<string[]>([])

  console.log('id: ', id);

  const { data } = useGetOneSpotQuery(id);

  useEffect(() => {
    if (data) {
      setSelectedSpot(data);
      // setSpotImages()
    }
  }, [data])

  useEffect(() => {
    navigation.setOptions({ presentation: 'modal' });
  }, [navigation]);

  const ImageLoader = () => {
    return (
      <ContentLoader
        speed={1.5}
        viewBox="0 0 500 500"
        height={100}
        width={100}
        backgroundColor="#f3f3f3"
        foregroundColor="#dcdada"
      >
        <Path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
        <Ellipse cx="120" cy="140" rx="28" ry="28" />
      </ContentLoader>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data && data.properties.Name}</Text>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <View style={styles.listContainer}> */}

      <FlatList
        key={data?._id}
        style={styles.listContainer}
        data={data?.properties.gx_media_links?.split(' ')}
        renderItem={({item}) => (
          <View style={styles.imgContainer}>
            {/* <TouchableOpacity
              key={item.id}
              style={{flex: 1}}
              onPress={() => {
                showModalFunction(true, item.src);
              }}> */}
              {<Image
                style={styles.spotImage}
                source={{ uri: item }}
                // source={item}
                contentFit='cover'
              /> || <ImageLoader />}
            {/* </TouchableOpacity> */}
          </View>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
      />

      {/* </View> */}
      <View style={styles.descriptionContainer} >
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionBody}>{data && data.properties.description}</Text>
      </View>

      {/* <View style={styles.imgContainer}>
        {spotImages && spotImages.map((img, i) => (
          <Image
            key={i}
            source={img}
            contentFit='contain'
            style={styles.spotImage}
          />
        ))}
      </View> */}

    {/* Use a light status bar on iOS to account for the black space above the modal */}
    <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  imgContainer: {
    flex: 1/2,
    // flexDirection: 'column',
    margin: 1,
    width: 100,
    alignItems: 'center'
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  spotImage: {
    flex: 1/2,
    height: 170,
    // width: 180,
    aspectRatio: 1,
    borderRadius: 30,
    marginBottom: 17
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    // justifyContent: 'space-evenly'

  },
  descriptionContainer: {
    flex: 1,
    width: '85%',

  },
  descriptionTitle: {
    flex: 1,
    alignSelf: 'flex-start',
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#FF0000',
    width: '100%',
    height: 4
  },
  descriptionBody: {
    flex: 1,
    alignSelf: 'flex-start'
  }
});
