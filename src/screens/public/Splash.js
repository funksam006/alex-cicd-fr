import { StyleSheet, Image, View } from 'react-native'
import React, { useEffect } from 'react'


import AsyncStorage from '@react-native-async-storage/async-storage'
// import i18n from '../languages/i18n'
import { Images } from '../../common/Images'
import { useNavigation } from '@react-navigation/native'
import { FULL_WIDTH } from '../../common/Constant'
const Splash = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigate();
        }, 1000);
    }, []);

    const navigate = async () => {
        let tokenInfo = await AsyncStorage.getItem('TOKEN');
        console.log('llljlll', tokenInfo)
        if (tokenInfo) {
            navigation.reset({
                routes: [{ name: "DrawerNavigation" }]
            })
        } else {

            navigation.reset({
                routes: [{ name: "Welcome" }]
            })
        }
    };

    // useEffect(() => {
    // const loadLanguage = async () => {
    // const lang = await AsyncStorage.getItem('language_key');
    // if (lang) {
    // i18n.changeLanguage(lang);
    // }
    // };

    // loadLanguage();
    // }, []);

    return (
        <View style={styles.container}>
            <Image source={Images.logo} style={styles.splashLogo} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    splashLogo: {
        width: FULL_WIDTH * 0.75,
        height: FULL_WIDTH * 0.4,
        resizeMode: 'contain',
    }
})