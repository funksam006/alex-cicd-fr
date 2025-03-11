import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ApplicationHeader } from '../../components/ApplicationHeader';
import { useIsFocused } from '@react-navigation/native';
import { API, GET_WITH_TOKEN } from '../../backend/Backend';
import { ApplicationButton } from '../../components/ApplicationButton';
import Icon from '../../components/ui/Icon';
import { Icons } from '../../common/Icons';
import { Colors } from '../../common/Colors';
import { RobotoFonts } from '../../common/Fonts';
import { useNavigation } from '@react-navigation/native';

const BookingHistory = () => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [bookinList, setBookingList] = useState([]);
  const [currentType, setCurrentType] = useState(1);
  useEffect(() => {
    if (isFocus) {
      getList();
    }
  }, [isFocus]);

  const getList = (type = 2) => {
    setCurrentType(type);
    GET_WITH_TOKEN(
      API + 'user_all_booking_lists?status=' + type,
      success => {
        console.log(success);
        setBookingList(success?.data || []);
        setCurrentType(type);
      },
      () => {
        setBookingList([]);
      },
      () => {
        setBookingList([]);
      },
    );
  };
  return (
    <View style={styles.container}>
      <ApplicationHeader content={'Booking History'} />
      {/* <ScrollView  > */}

      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <ApplicationButton
          onPress={() => getList(1)}
          content={'OnGoing'}
          buttonStyle={currentType == 1 ? styles.active : styles.deactive}
          buttonTextStyle={
            currentType == 1 ? styles.activeText : styles.deactiveText
          }
        />
        <ApplicationButton
          onPress={() => getList(2)}
          content={'Completed'}
          buttonStyle={currentType == 2 ? styles.active : styles.deactive}
          buttonTextStyle={
            currentType == 2 ? styles.activeText : styles.deactiveText
          }
        />
        <ApplicationButton
          onPress={() => getList(3)}
          content={'Canceled'}
          buttonStyle={currentType == 3 ? styles.active : styles.deactive}
          buttonTextStyle={
            currentType == 3 ? styles.activeText : styles.deactiveText
          }
        />
      </View>
      <FlatList
        data={bookinList}
        style={{ flex: 1, padding: 15, paddingTop: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item, index }) => {
          console.log('booking list item', item);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BookingScreen', {
                  id: item.booking_id
                })
              }}
              disabled={currentType != 1}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                overflow: 'hidden',
                elevation: 5,
                marginVertical: 10,
                borderWidth: 1,
                borderColor: Colors.black,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: RobotoFonts.medium500,
                    fontSize: 16,
                  }}>
                  Booking Id: #${item?.booking_id}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  paddingBottom: 25,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={Icons.pickToDrop}
                    style={{ height: 100, width: 30, resizeMode: 'contain' }}
                  />
                  <View
                    style={{
                      marginLeft: 15,
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <View>
                      <Text style={{ fontSize: 15, color: 'black' }}>
                        {'Pickup'}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        {item?.pickuplocation}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text style={{ fontSize: 15, color: 'black' }}>
                        {'Drop'}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        {item?.droplocation}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  padding: 15,
                  borderTopWidth: 1,
                  borderTopColor: 'lightgrey',
                  flexDirection: 'row',
                }}>
                <View
                  style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  {/* <Icon round source={{uri : item?.driver?.profile}} size={50}  /> */}
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{
                        marginLeft: 4,
                        textAlign: 'center',
                        marginBottom: 4,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {item?.driver?.name}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: Colors.black,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    <ApplicationHeader content={"Ride"} />
                    {'R ' + item?.fare}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: 'grey',
                      fontSize: 14,
                      marginTop: 5,
                    }}>
                    {item?.payment_mode == 1 ? 'Wallet' : 'Cash'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white"
  },
  active: {
    flex: 1,
    width: undefined,
    marginHorizontal: 10,
    backgroundColor: Colors.black,
  },
  deactive: {
    flex: 1,
    width: undefined,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  activeText: {
    color: 'white',
  },
  deactiveText: {
    color: 'black',
  },
});

export default BookingHistory;
