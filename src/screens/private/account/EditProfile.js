import {ScrollView, View} from 'react-native';
import {ApplicationHeader} from '../../../components/ApplicationHeader';
import {ApplicationButton} from '../../../components/ApplicationButton';
import ApplicationTextInput from '../../../components/inputs/ApplicationTextInput';
import {Icons} from '../../../common/Icons';
import {useEffect, useState} from 'react';
import {isValidForm, validators} from '../../../backend/Validators';
import {API, POST_WITH_TOKEN} from '../../../backend/Backend';
import Toast from 'react-native-toast-message';
import {updateUserData} from '../../../../features/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const EditProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [errorData, setErrorData] = useState({});
  const dispatch = useDispatch();
  const profileData = useSelector(res => res?.auth?.userData);
  console.log(profileData);
  useEffect(() => {
    setName(profileData?.name);
    setEmail(profileData?.email);
    setNumber(profileData?.mobile);
  }, []);
  const onSubmit = () => {
    var errorApi = {
      name: validators.checkRequire('Name', name),
      email: validators.checkEmail('Email', email),
      number: validators.checkNumber('Phone Number', number),
    };
    setErrorData(errorApi);
    if (isValidForm(errorApi)) {
      POST_WITH_TOKEN(
        API + 'update_user_profile',
        {
          name: name,
          email: email,
          mobile: number,
        },
        success => {
          console.log('==>>UPdate Profile', success);
          Toast.show({
            type: 'success',
            text1: 'Updated Successfully',
          });
          var user_data = {
            ...profileData,
            name: name,
            email,
            mobile: number,
          };
          dispatch(updateUserData(user_data));

          // return
          navigation.goBack();
        },
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ApplicationHeader content={'Edit Profile'} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, padding: 15}}>
        <ApplicationTextInput
          headingText="Full Name"
          placeholder={'Enter your full name'}
          source={Icons.person}
          value={name}
          error={errorData?.name}
          onChangeText={setName}
        />
        <ApplicationTextInput
          headingText="Email"
          placeholder={'Enter your email'}
          source={Icons.sms}
          error={errorData?.email}
          value={email}
          onChangeText={setEmail}
        />
        <ApplicationTextInput
          headingText="Phone"
          placeholder={'Enter your phone number'}
          source={Icons.call}
          error={errorData?.number}
          value={number}
          onChangeText={setNumber}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: 'grey',
          padding: 15,
        }}>
        <ApplicationButton
          content={'Cancel'}
          onPress={()=>{
            navigation.goBack()
          }}
          buttonStyle={{
            backgroundColor: 'white',
            width: undefined,
            flex: 1,
            borderWidth: 1,
            borderColor: 'black',
            marginRight: 15,
          }}
          buttonTextStyle={{color: 'black'}}
        />
        <ApplicationButton
          content={'Update Profile'}
          buttonStyle={{width: undefined, flex: 1}}
          onPress={() => onSubmit()}
        />
      </View>
    </View>
  );
};
export default EditProfile;
