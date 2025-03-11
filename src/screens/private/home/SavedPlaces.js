import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import {Colors} from '../../../common/Colors';
import {ApplicationHeader} from '../../../components/ApplicationHeader';
import {Icons} from '../../../common/Icons';
import {RobotoFonts} from '../../../common/Fonts';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {API, GET_WITH_TOKEN, POST_WITH_TOKEN} from '../../../backend/Backend';
import Icon from '../../../components/ui/Icon';

const SavedPlaces = () => {
  const navigation = useNavigation();
  const [savedAddress, setSavedAddress] = useState([]);
  // const isFocus = useIsFocused()
  useEffect(() => {
    // if (isFocus) {
    getSavedAddress();
    // }
  }, []);

  const addFav = id => {
    POST_WITH_TOKEN(API + 'add_remove_address', {address_id: id}, success => {
      getSavedAddress();
    });
  };

  const getSavedAddress = () => {
    GET_WITH_TOKEN(API + 'get_user_address', success => {
      setSavedAddress(success?.data);
      console.log(success?.data);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <ScrollView>
        <View style={{backgroundColor: Colors.white}}>
          <ApplicationHeader
            content={'Saved Places'}
            source={Icons.addIcon}
            rightContent={'Add Places'}
            addIcons
            onPress={() => navigation.navigate('AddPlaces')}
          />
          <FlatList
            data={savedAddress}
            renderItem={({item, index}) => (
              <>
                <View style={styles.savedContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.starContainer}>
                      <Image source={Icons.location} style={styles.star} />
                    </View>

                    <View style={{flex: 1, marginHorizontal: 10}}>
                      <Text style={styles.homeText}>{item?.type}</Text>
                      <Text style={styles.addressText}>{item?.address}</Text>
                    </View>
                    <Icon
                      source={Icons.star}
                      size={30}
                      touchable
                      tintColor={item?.is_fav == 1 ? Colors.black : 'grey'}
                      onPress={() => {
                        addFav(item?.id);
                      }}
                      style={{
                        height: 30,
                        width: 30,
                        tintColor: item?.is_fav == 1 ? 'black' : 'grey',
                      }}
                    />
                  </View>
                </View>
                {index + 1 !== savedAddress.length && (
                  <View style={styles.horizontalLine} />
                )}
              </>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    marginBottom: 10,
  },
  savedContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starContainer: {
    height: 35,
    width: 35,
    borderRadius: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  star: {
    height: 19,
    width: 19,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  homeText: {
    color: 'black',
    fontSize: 16,
    fontFamily: RobotoFonts.medium500,
    fontWeight: 'bold',
  },
  addressText: {
    color: 'black',
    fontSize: 12,
    fontFamily: RobotoFonts.regular400,
  },
});

export default SavedPlaces;
