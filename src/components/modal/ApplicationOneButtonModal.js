import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../common/Colors';
import {RobotoFonts} from '../../common/Fonts';

const ApplicationOneButtonModal = ({
  onRequestClose= ()=>{},
  visible,
  source,
  headingText,
  subHeading,
  button,
  buttonTitle,
  onPress
}) => {
  return (
    <View>
      <Modal
        transparent={true}
        style={{margin: 0}}
        visible={visible}
        onRequestClose={onRequestClose}>
        <TouchableOpacity onPress={onRequestClose} style={styles.modalMainContainer}>
          <View style={styles.modal}>
            <Image source={source} style={styles.imgStyling} />
            <Text style={styles.headingText}>{headingText}</Text>
            <Text style={styles.subHeading}>{subHeading}</Text>

            {button ? (
              <TouchableOpacity
              onPress={onPress}
                style={styles.buttonContainer}
                activeOpacity={0.5}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '90%',
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imgStyling: {
    height: 122,
    width: 108,
    resizeMode: 'contain',
  },
  headingText: {
    color: Colors.black,
    fontSize: 22,
    fontFamily: RobotoFonts.bold700,
    marginVertical: 10,
    textAlign: 'center',
  },
  subHeading: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: RobotoFonts.regular400,
    textAlign: 'center',
    marginHorizontal:20
  },
  buttonContainer: {
    height: 50,
    backgroundColor: Colors.button,
    width: '100%',
    borderRadius: 60,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: RobotoFonts.bold700,
  },
});

export default ApplicationOneButtonModal;
