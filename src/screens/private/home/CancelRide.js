import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../../common/Colors';
import { ApplicationHeader } from '../../../components/ApplicationHeader';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { RobotoFonts } from '../../../common/Fonts';
import { Responsive } from '../../../assets/theme/Layout';
import { Icons } from '../../../common/Icons';
import { ApplicationButton } from '../../../components/ApplicationButton';
import ApplicationOneButtonModal from '../../../components/modal/ApplicationOneButtonModal';
import { Images } from '../../../common/Images';
import { API, GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../backend/Backend';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';

// const reason = [
//   {
//     id: '1',
//     reason: 'waiting for long time',
//   },
//   {
//     id: '2',
//     reason: 'Unable to contact driver',
//   },
//   {
//     id: '3',
//     reason: 'Driver denied to go to destination',
//   },
//   {
//     id: '4',
//     reason: 'Driver denied to come to pickup',
//   },
//   {
//     id: '5',
//     reason: 'Wrong address shown',
//   },
//   {
//     id: '6',
//     reason: 'The price is not reasonable',
//   },
// ];

const CancelRide = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const route = useRoute()
  const navigation = useNavigation()
  const [reason, setReason] = useState([])
  const [reasonid, setReasonId] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reasonText, setReasonText] = useState("")
  useEffect(() => {
    console.log("===>>>");
    getReason()
  }, [])
  const getReason = () => {
    GET_WITH_TOKEN(API + "ride_cancel_list", (s) => {
      setReason(s?.data)
    })
  }
  console.log(route.params);
  const onSubmit = () => {
    if (reasonid.length < 1) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select any reason"
      })
      return
    }
    var apiData = {
      reason_id: reasonid.join(','),
      reason_text: reasonText,
      booking_id: route.params?.booking_id
    }
    POST_WITH_TOKEN(API + "user_cancel_ride",
      apiData,
      (s) => {

        setShowModal(true)
      },
      (e) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: e?.message
        })
      },
      (e) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: e?.message
        })
      }
    )
  }
  console.log('reasonid>>>>>', reasonid);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <ApplicationHeader content={'Cancel Ride'} />
      <View style={styles.horizontalLine} />

      <ScrollView>
        <View>
          <Text style={styles.headingText}>
            Choose The Reason For Cancel The Ride
          </Text>
        </View>

        <FlatList
          data={reason}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.checkContainer}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    var arr = [...reasonid]
                    // setSelectedItemIndex(index);
                    var findIndex = arr.findIndex((e) => e == item.id)
                    console.log(findIndex);
                    if (findIndex >= 0) {
                      arr.splice(findIndex, 1)
                    } else {
                      arr.push(item.id)
                    }
                    console.log(arr);
                    setReasonId(arr);
                  }}  >
                  <Image
                    source={
                      !!reasonid.find((e) => e == item.id)
                        ? Icons.checkbox
                        : Icons.checked
                    }
                    style={styles.select}
                  />
                </TouchableOpacity>
                {/* <View> */}
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: Responsive.font(16),
                    fontFamily: RobotoFonts.medium500,
                    flex: 1
                  }}>
                  {item?.reason}
                </Text>
              </View>
            );
          }}
        />


        <>
          <Text style={styles.headingText}>Other</Text>

          <TextInput
            placeholder="Type your reason"
            placeholderTextColor={Colors.para}
            style={styles.input}
            value={reasonText}
            onChangeText={setReasonText}
            multiline={true}
          />
        </>



        <View style={{ margin: 20, flexDirection: 'row' }}>
          <Text style={styles.noteText}>
            You may be charged some amount for cancellation Terms and Conditions
            apply.
            <Text style={{ color: Colors.red }}>*</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ApplicationButton
          content={'SUBMIT'}
          onPress={() => onSubmit()}
        />
      </View>

      {showModal ? (
        <ApplicationOneButtonModal
          onRequestClose={() => {
            navigation.reset({
              index: 0,
              routes: [{
                name: "DrawerNavigation"
              }]
            })
            setShowModal(false)
          }}
          source={Images.rideCancel}
          headingText={'We’re so sad about your cancellation'}
          subHeading={
            'We will continue to improve our service & satisfy you on the next trip'
          }
          button
          buttonTitle={'Okay'}

          onPress={() => {
            // navigation.navigate("Home",{
            //   index: 0,
            //   routes :[{
            //     name : "Home"
            //     }]
            //     })





            navigation.reset({
              index: 0,
              routes: [{
                name: "DrawerNavigation"
              }]
            })
            setTimeout(() => {

              setShowModal(false)
            }, 500);

          }}
        />
      ) : null}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  headingText: {
    margin: 20,
    color: Colors.para,
    fontSize: 16,
    fontFamily: RobotoFonts.medium500,
  },
  checkContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  select: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    marginHorizontal: 20,
    height: 80,
    paddingHorizontal: 15,
  },
  noteText: {
    color: Colors.para,
    fontSize: 13,
    fontFamily: RobotoFonts.regular400,
  },
  footer: {
    paddingVertical: 20,
    borderTopColor: Colors.line,
    borderTopWidth: 2,
    paddingHorizontal: 20,
  },
});

export default CancelRide;
