import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from '../../../components/ui/Icon';
import { Icons } from '../../../common/Icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { InterFonts, RobotoFonts } from '../../../common/Fonts';
import { ApplicationButton } from '../../../components/ApplicationButton';
import ImagePicker from '../../../components/modal/ImagePicker';
import {
  API,
  GET_WITH_TOKEN,
  POST_WITH_TOKEN_FORMDATA,
} from '../../../backend/Backend';
import { updateUserData } from '../../../../features/authReducer';
import Toast from 'react-native-toast-message';

const Account = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState();
  const [editModal, setEditModal] = useState(false);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    getProfile();
  }, [isFocus]);

  const getProfile = () => {
    GET_WITH_TOKEN(
      API + 'profile',
      success => {
        console.log('Profile==>SUCCESS', success);
        setProfileData(success?.data);
        dispatch(updateUserData(success?.data));
      },
      error => {
        console.log('Profile==>error', error);
      },
      fail => {
        console.log('==>fail', fail);
      },
    );
  };

  console.log('profileData>>>>', profileData);


  const RenderField = ({ label, value, image }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
        <Icon
          source={image}
          size={40}
          style={{ marginLeft: 15, marginRight: 15 }}
        />
        <View>
          <Text style={{ fontSize: 13, color: 'grey' }}>{label}</Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: InterFonts.bold700,
              color: 'black',
            }}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

  const RenderArrowButtom = ({ img, label, disabled, rightContent, onPress = () => { }, }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          flexDirection: 'row',
          padding: 15,
          borderRadius: 10,
          backgroundColor: 'white',
          marginTop: 20,
          alignItems: 'center',
        }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {img && <Icon source={img} size={30} />}
          <Text
            style={{
              fontSize: 17,
              color: 'black',
              fontFamily: InterFonts.medium500,
              marginLeft: 10,
            }}>
            {label}
          </Text>
        </View>
        {rightContent ?
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: 'black',
              fontFamily: InterFonts.medium500,
            }}>
            {rightContent}
          </Text>
          :
          <Icon source={Icons.arrowLeft} tintColor={'black'} />}
      </TouchableOpacity>
    );
  };

  const updloadImage = e => {
    var formData = new FormData();
    formData.append('profile', e);
    console.log(formData);
    POST_WITH_TOKEN_FORMDATA(API + 'change_profile_image', formData, s => {
      getProfile();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: s.message,
      });
    }, error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }

    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <ImagePicker
          visible={editModal}
          onClose={() => setEditModal(false)}
          selected={e => {
            console.log(e);
            updloadImage(e);
          }}
        />
        <View
          style={{ flexDirection: 'row', backgroundColor: 'white', padding: 15 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              source={Icons.sideHeaderIcon}
              size={20}
              touchable
              onPress={() => navigation.openDrawer()}
            />
            <Icon
              source={
                profileData?.profile
                  ? { uri: profileData?.profile }
                  : Icons.person
              }
              size={30}
              round
              style={{ marginLeft: 15, marginRight: 10 }}
            />
            <View>
              <Text style={{ fontSize: 13, color: 'grey' }}>{'Welcome'}</Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: InterFonts.bold700,
                  color: 'black',
                }}>
                {profileData?.name}
              </Text>
            </View>
          </View>
          <Icon
            source={Icons.notification}
            onPress={() => {
              navigation.navigate('Notification');
            }}
            size={40}
          />
        </View>
        <View style={{ padding: 15 }}>
          <View style={{ marginVertical: 25 }}>
            <View
              style={{
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 60,
                padding: 5,
                borderColor: 'black',
              }}>
              <Icon
                round
                source={
                  profileData?.profile
                    ? { uri: profileData?.profile }
                    : Icons.person
                }
                size={100}
                touchable
                onPress={() => setEditModal(true)}
              />
              <Icon
                source={Icons.camera}
                style={{ position: 'absolute', right: 0, bottom: 10 }}
                size={30}
                touchable
                onPress={() => setEditModal(true)}
                resizeMode="contain"
              />
            </View>
          </View>
          <ApplicationButton
            buttonStyle={{
              alignSelf: 'center',
              width: undefined,
              paddingHorizontal: 20,
              paddingRight: 20,
              marginBottom: 20,
            }}
            content={'Edit Profile'}
            onPress={() => navigation.navigate('EditProfile')}
            leftImg={Icons.edit}
            imgStyle={{
              tintColor: 'white',
              marginRight: 10,
              height: 25,
              width: 25,
              marginTop: 3,
            }}
          />
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 15,
              paddingBottom: 30,
            }}>
            <RenderField
              image={Icons.name}
              label="Name"
              value={profileData?.name}
            />
            <RenderField
              image={Icons.email}
              label="Email"
              value={profileData?.email}
            />
            <RenderField
              image={Icons.number}
              label="Phone No."
              value={profileData?.mobile}
            />
          </View>

          <RenderArrowButtom rightContent={profileData?.refrel_count} label={'Total no of refferal'} disabled={true} />

          <RenderArrowButtom
            onPress={() => navigation?.navigate('ChangePassword')}
            img={Icons.key}
            label={'Change Password'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
});

export default Account;
