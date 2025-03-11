import React, { useState } from 'react';
import { BackHandler, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { InterFonts } from '../../common/Fonts';
import { Responsive } from '../../assets/theme/Layout';
import { Colors } from '../../common/Colors';
import { Icons } from '../../common/Icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { CountryPicker } from 'react-native-country-codes-picker';

const ApplicationTextInput = ({
  source,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  maxLength,
  editable,
  headingText,
  icons,
  secure = false,
  leftIcon,
  leftIconStyle,
  error,
  type = "input",
  format = "YYYY-MM-DD",
  minDate = new Date(),
  maxDate = null
}) => {
  const [isPasswordShows, setPasswordShows] = useState(false);
  const [secureText, setSecureText] = useState(secure);
  const [datePicker, setDatePicker] = useState(false);
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCallingCode, setSelectedCallingCode] = useState('+27');

  const onCountrySelect = country => {
    setCountryCode(country.flag);

    setSelectedCallingCode(country.dial_code);

    setShowCountryPicker(false);
  };

  React.useEffect(() => {
    const handleBackPress = () => {
      if (showCountryPicker) {
        // If the country picker is open, close it
        setShowCountryPicker(false)
        return true; // Prevent default back action
      }
      return false; // Allow default back action
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup listener on unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [showCountryPicker]);

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={datePicker}
        mode={type}
        minimumDate={minDate}
        maximumDate={maxDate}
        onConfirm={(e) => {
          setDatePicker(false);
          onChangeText(e);
        }}
        onCancel={() => setDatePicker(false)}
      />
      {
        !!headingText &&
        <Text style={styles.inputHeading}>{headingText}</Text>
      }

      <View style={styles.inputContainer}>
        {(icons || source) && <Image source={source} style={styles.icons} />}
        
        {
          type === "date" || type === "time" ? (
            <TouchableOpacity disabled={editable} style={{ flex: 1, justifyContent: 'center' }} onPress={() => setDatePicker(true)}>
              <Text style={[styles.input, { flex: undefined, color: value ? Colors.black : Colors.para }]}>{value ? moment(value).format(format) : placeholder}</Text>
            </TouchableOpacity>
          ) : type === "phone" ? (
            <>
            <TouchableOpacity onPress={() => setShowCountryPicker(true)}>
              <Text style={[styles.callingCode,{
                color:'black'
              }]}>
                {selectedCallingCode} {/* Display selected calling code */}
              </Text>
            </TouchableOpacity>
              <TextInput
                value={value}
                onChangeText={(text) => onChangeText(` ${text.trim()}`)} // Prepend country code
                placeholder={placeholder}
                style={styles.input}
                keyboardType={keyboardType}
                maxLength={maxLength}
                editable={editable}
              />
            </>
          ) : (
            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureText}
              placeholderTextColor={Colors.para}
              keyboardType={keyboardType}
              maxLength={maxLength}
              editable={editable}
            />
          )
        }

        {secure && (
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image
              style={styles.icons}
              source={secureText ? Icons.closeEye : Icons.openEye}
            />
          </TouchableOpacity>
        )}
        {leftIcon && <Image source={leftIcon} style={[styles.icons, leftIconStyle]} />}
      </View>
      <CountryPicker
        show={showCountryPicker}
        style={{marginTop: 30}}
        pickerButtonOnPress={onCountrySelect}
        onBack={(e)=>{
          console.log(e)
          setShowCountryPicker(false);
        }}
        onRequestClose={()=>{
          setShowCountryPicker(false);
        }}
      />
      {
        !!error &&
        <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Responsive.height(10),
    marginBottom: Responsive.height(20),
  },
  inputHeading: {
    fontSize: 14,
    fontFamily: InterFonts.regular400,
    color: "black",
    marginBottom: 10,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Responsive.width(15),
  },
  icons: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  input: {
    color: "black",
    fontSize: 16,
    flex: 1,
    fontFamily: InterFonts.regular400,
  },
  countryPicker: {
    marginRight: 8,
  },
});

export default ApplicationTextInput;
