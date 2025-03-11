import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors} from '../../../common/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {ApplicationHeader} from '../../../components/ApplicationHeader';
import {InterFonts, RobotoFonts} from '../../../common/Fonts';
import {Icons} from '../../../common/Icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {ApplicationButton} from '../../../components/ApplicationButton';
import {Responsive} from '../../../assets/theme/Layout';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from '../../../components/ui/Icon';
import Toast from 'react-native-toast-message';
import {API, POST_WITH_TOKEN} from '../../../backend/Backend';
import ApplicationTextInput from '../../../components/inputs/ApplicationTextInput';
import {date} from 'yup';

const hours = [
  {
    id: '1',
    label: '1 hour',
  },
  {
    id: '2',
    label: '2 hours',
  },
  {
    id: '3',
    label: '3 hours',
  },
  {
    id: '4',
    label: '4 hours',
  },
];

const minutes = [
  {
    id: '1',
    label: '5 minutes',
  },
  {
    id: '2',
    label: '10 minutes',
  },
  {
    id: '3',
    label: '15 minutes',
  },
  {
    id: '4',
    label: '20 minutes',
  },
  {
    id: '5',
    label: '25 minutes',
  },
  {
    id: '6',
    label: '30 minutes',
  },
  {
    id: '7',
    label: '35 minutes',
  },
  {
    id: '8',
    label: '40 minutes',
  },
  {
    id: '10',
    label: '45 minutes',
  },
  {
    id: '11',
    label: '50 minutes',
  },
  {
    id: '12',
    label: '55 minutes',
  },
];

const TaxiBooking = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [selected, setSelected] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hourValue, setHourValue] = useState(null);
  const [minuteValue, setMinuteValue] = useState(null);
  const [sheduleTime, setSheduleTime] = useState({
    date: null,
    time: null,
  });
console.log('sheduleTime',hourValue);

  const routeData = route?.params;
  var drop_data =
    typeof routeData?.drop_data == 'string'
      ? JSON.parse(routeData?.drop_data)
      : routeData?.drop_data;
  drop_data = typeof drop_data == 'string' ? JSON.parse(drop_data) : drop_data;

  // var drop_data = null
  // console.log(typeof JSON.parse(JSON.parse(routeData?.drop_data)));
  const onProcced = () => {
    // navigation.navigate('VehicleType')
    if (!selected) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please Select ride type',
      });

    
      return;
    }
    if(selected == 'schedule' ){
      if(sheduleTime?.date==null || sheduleTime?.time==null){
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please Select Date and Time',
        });
        return;
      }
    }
    if(selected=='rental'){
      if(minuteValue==null || hourValue==null){
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please Select The Time',
        });
        return;
      }
    }
    
    console.log(routeData);
    const apiData = {
      // booking_id: routeData?.booking_id,
      // ridetype: selected== "now" ? 1 : selected == "schedule" ? 2 : 3
      pick_up_location: routeData?.pickup_location,
      pick_up_lat: routeData?.pickup_lat,
      pick_up_long: routeData?.pickup_long,
      drop_location: drop_data[drop_data.length - 1]?.drop_location,
      drop_lat: drop_data[drop_data.length - 1]?.drop_lat,
      drop_long: drop_data[drop_data.length - 1]?.drop_long,
      booking_date: sheduleTime?.date
        ? moment(sheduleTime?.date).format('DD-MM-YYYY')
        : null,
      booking_time: sheduleTime?.date
        ? moment(sheduleTime?.date).format('HH:mm')
        : null,
    };
    console.log(apiData);

    POST_WITH_TOKEN(
      API + 'search_vehicle',
      apiData,
      success => {
        console.log('===>SUcces', success, '');
        navigation.navigate('VehicleType', {
          locationData: routeData,
          vehcileData: success?.data,
          drop_arr: drop_data,
          drop_data: drop_data[drop_data.length - 1],
          pick_data: {
            pick_up_location: routeData?.pickup_location,
            pick_up_lat: routeData?.pickup_lat,
            pick_up_long: routeData?.pickup_long,
          },
        });
      },
      error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message,
        });
        console.log('===>error', error);
      },
      fail => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: fail?.message,
        });
        console.log('===>fail', fail);
      },
    );
  };
  console.log('selected', selected);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <ScrollView>
        <View style={styles.mainContainer}>
          <ApplicationHeader content={'Taxi Booking'} />

          <View style={styles.horizontalLine} />

          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Locations:</Text>

            <Icon
              onPress={() => navigation.goBack()}
              source={Icons.edit}
              style={styles.editIcon}
            />
          </View>

          <View style={styles.dropMainContainer}>
            <View style={styles.imgContainer}>
              <Image source={Icons.oneLocation} style={styles.location} />
            </View>

            <View style={styles.dropContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.pickupText}>Pickup</Text>
                <Text style={styles.locationText} numberOfLines={2}>
                  {routeData?.pickup_location}
                </Text>
              </View>

              <View style={{flex: 1}}>
                <Text style={styles.pickupText}>Drop</Text>
                <Text style={styles.locationText} numberOfLines={2}>
                  {drop_data[drop_data.length - 1]?.drop_location}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.horizontalLine, {borderTopWidth: 2}]} />

          <View style={styles.timeOptionContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setSelected('now')}
              style={
                selected == 'now'
                  ? styles.selectedContainer
                  : styles.unselectedContainer
              }>
              {selected == 'now' ? (
                <Image
                  source={Icons.check}
                  resizeMode="contain"
                  style={styles.check}
                />
              ) : null}
              <Text
                style={
                  selected == 'now'
                    ? styles.selectedText
                    : styles.unselectedText
                }>
                Now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setSelected('schedule')}
              style={
                selected == 'schedule'
                  ? styles.selectedContainer
                  : styles.unselectedContainer
              }>
              {selected == 'schedule' ? (
                <Image
                  resizeMode="contain"
                  source={Icons.check}
                  style={styles.check}
                />
              ) : null}
              <Text
                style={
                  selected == 'schedule'
                    ? styles.selectedText
                    : styles.unselectedText
                }>
                Schedule Ride
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setSelected('rental')}
              style={
                selected == 'rental'
                  ? styles.selectedContainer
                  : styles.unselectedContainer
              }>
              {selected == 'rental' ? (
                <Image
                  resizeMode="contain"
                  source={Icons.check}
                  style={styles.check}
                />
              ) : null}
              <Text
                style={
                  selected == 'rental'
                    ? styles.selectedText
                    : styles.unselectedText
                }>
                Rental
              </Text>
            </TouchableOpacity>
          </View>

          {selected == 'schedule' ? (
            <View style={{padding: 15, paddingTop: 0}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '47%'}}>
                  <ApplicationTextInput
                    type="date"
                    value={sheduleTime.date}
                    placeholder={'Selct Date'}
                    leftIcon={Icons.calendar}
                    onChangeText={e => {
                      setSheduleTime({
                        ...sheduleTime,
                        date: e,
                      });
                    }}
                    leftIconStyle={{tintColor: 'grey'}}
                  />
                </View>

                <View style={{width: '47%'}}>
                  <ApplicationTextInput
                    type="time"
                    value={sheduleTime.time}
                    format="hh:mm A"
                    maxDate={
                      moment(sheduleTime.date).format('DD-MM-YYYY') ==
                      moment().format('DD-MM-YYYY')
                        ? new Date(new Date().getTime() + 3 * 60000)
                        : new Date()
                    }
                    minDate={
                      moment(sheduleTime.date).format('DD-MM-YYYY') ==
                      moment().format('DD-MM-YYYY')
                        ? new Date(new Date().getTime() + 3 * 60000)
                        : null
                    }
                    editable={!sheduleTime?.date}
                    placeholder={'Selct Time'}
                    leftIcon={Icons.clock}
                    onChangeText={e => {
                      setSheduleTime({
                        ...sheduleTime,
                        time: e,
                      });
                    }}
                    leftIconStyle={{tintColor: 'grey'}}
                  />
                </View>
              </View>
            </View>
          ) : null}

          {selected == 'rental' ? (
            <View style={styles.rentalContainer}>
              <Text style={styles.quesText}>How much time do you need ?</Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '47%'}}>
                  <Dropdown
                    style={styles.input}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={{color:'black'}}
                    iconStyle={styles.iconStyle}
                    data={hours}
                    maxHeight={300}
                    labelField="label"
                    valueField="id"
                    placeholder={!isFocus ? 'Select hours' : '...'}
                    value={hourValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      console.log('itemitemitem', item);
                      setHourValue(item.id);
                      setIsFocus(false);
                    }}
                  />
                </View>

                <View style={{width: '47%'}}>
                  <Dropdown
                    disable={false}
                    style={styles.input}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={{color:'black'}}
                    iconStyle={styles.iconStyle}
                    data={minutes}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocused ? 'Select minutes' : '...'}
                    value={minuteValue}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={item => {
                      console.log('minutes',item)
                      setMinuteValue(item.label);
                      setIsFocused(false);
                    }}
                  />
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ApplicationButton content={'Proceed'}  onPress={() => onProcced()} />
      </View>
      <Toast />
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
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  locationText: {
    color: 'black',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    fontFamily: RobotoFonts.medium500,
  },
  mainContainer: {
    backgroundColor: Colors.white,
  },
  editIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  dropMainContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  imgContainer: {
    width: '10%',
    alignItems: 'flex-end',
  },
  dropContainer: {
    justifyContent: 'space-between',
    paddingLeft: 20,
    flex: 1,
  },
  location: {
    height: 80,
    width: 15,
    resizeMode: 'contain',
  },
  pickupText: {
    color: Colors.para,
    fontSize: 13,
    fontFamily: InterFonts.semiBold600,
  },

  timeOptionContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
    flexWrap: 'wrap',
    flex: 1,
  },
  selectedContainer: {
    backgroundColor: Colors.black,
    borderRadius: 90,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    marginRight: 10,
    marginBottom: 10,
    height: 45,
  },
  selectedText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: RobotoFonts.regular400,
  },
  check: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    marginRight: 10,
  },
  unselectedContainer: {
    borderWidth: 1,
    borderColor: Colors.para,
    borderRadius: 90,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // flex:1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    // flex: 1
  },
  unselectedText: {
    color: Colors.para,
    fontSize: 18,
    fontFamily: RobotoFonts.regular400,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  timedayContainer: {
    flex: 1,
    borderTopColor: Colors.line,
    borderTopWidth: 1.5,
  },
  footer: {
    paddingHorizontal: Responsive.width(20),
    paddingVertical: Responsive.height(20),
    backgroundColor: Colors.white,
  },
  rentalContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  quesText: {
    fontSize: 25,
    color: 'black',
    fontFamily: InterFonts.semiBold600,
  },
  input: {
    color: 'black',
    fontFamily: InterFonts.medium500,
    fontSize: 14,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    marginTop: 15,
    paddingLeft: 15,
    backgroundColor: Colors.background,
    height: 50,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle:{
    color:'grey'
  }
});

export default TaxiBooking;
