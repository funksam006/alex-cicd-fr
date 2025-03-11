import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";

const PaystackWebViewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { paymentUrl } = route.params;
  const [loading, setLoading] = useState(true);

  // Jab payment ho jaye ya fail ho jaye
  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    const orderIdMatch = url.match(/order_id=([^&]+)/);
  
    if (orderIdMatch) {
      const orderId = orderIdMatch[1]; 
      console.log('Order ID:', orderId);
      navigation.navigate('MyWallet');
    } 
  };
  

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" color="blue" style={{ position: "absolute", top: "50%", left: "50%" }} />}
      <WebView
        source={{ uri: paymentUrl }}
        onLoad={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default PaystackWebViewScreen;
