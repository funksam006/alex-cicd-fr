import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SectionList
} from 'react-native';
import { Colors } from '../../../common/Colors';
import { ApplicationHeader } from '../../../components/ApplicationHeader';
import { Images } from '../../../common/Images';
import { InterFonts, RobotoFonts } from '../../../common/Fonts';
import { Icons } from '../../../common/Icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API, POST_WITH_TOKEN } from '../../../backend/Backend';
import Typography from '../../../components/ui/Typography';

const VehicleType = () => {

  const navigation = useNavigation();
  const route = useRoute()
  const routeData = route?.params
  console.log(routeData?.vehcileData);

  const renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        key={`key_${index}`}
        style={styles.taxiContainer}
        onPress={() => navigation.navigate("BookNow", {
          ...routeData,
          vehcileData: item
        })}
        activeOpacity={0.5} >
        <View style={{}}>
          <Image
            borderRadius={10}
            source={{ uri: item?.image }}
            style={styles.sharingTaxi}
          />
        </View>

        <View style={{
          flex: 1,
          marginHorizontal: 10, justifyContent: 'center'
        }}>
          <Text style={styles.taxiName}>{item?.name}</Text>
          <Text style={[styles.priceText, { color: "black" }]}>{item?.time_duration}</Text>
        </View>

        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.tashText}>{'R ' + item?.fare}</Text>
            <Image
              source={Icons.backArrow}
              style={styles.backArrow}
            />
          </View>

          <View>
            <Text style={styles.priceText}>Estimate Price</Text>
          </View>
        </View>
      </TouchableOpacity>
    );


  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      {/* <ScrollView  > */}
      <View style={styles.mainContainer}>
        <ApplicationHeader content={'Select Vehicle Type'} />

        <View style={styles.horizontalLine} />
        <SectionList
          sections={routeData?.vehcileData || []}
          keyExtractor={(item, index) => item.id + index}
          renderItem={renderItem}

          // style={{flex: 1}}
          // contentContainerStyle={{flex: 1}}
          renderSectionHeader={({ section }) => section?.data?.length > 0 ? (
            <Text style={{ color: "grey", fontWeight: "bold", fontSize: 16, marginTop: 20, paddingHorizontal: 20 }} >{section?.item}</Text>
          ) : <></>}

        // ListEmptyComponent={<Typography>No Data Available</Typography>}

        />

        {/* <FlatList
            data={routeData?.vehcileData|| []}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item?.id}
            renderItem={renderItem}
          /> */}
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    marginBottom: 10,
  },
  taxiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.6,
    borderColor: "grey",
    paddingBottom: 20
  },
  sharingTaxi: {
    height: 50,
    width: 50,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  taxiName: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: RobotoFonts.bold700,
  },
  tashText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: InterFonts.semiBold600,
  },
  backArrow: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
  },
  priceText: {
    color: Colors.para,
    fontSize: 12,
    fontFamily: InterFonts.regular400,
  },
  taxiText: {
    color: Colors.para,
    fontSize: 14,
    fontFamily: InterFonts.bold700,
    marginLeft: 20,
  },
  timeText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: RobotoFonts.regular400,
  },
});

export default VehicleType;
