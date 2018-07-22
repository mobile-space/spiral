import React from "react";
import {
  Dimensions,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { LinearGradient } from "expo";
import QRCode from "react-native-qrcode-svg";

const { width, height } = Dimensions.get("window");
const size = Math.min(width, height) * 0.9;

const WalletScreen = () => (
  <LinearGradient
    style={{ flex: 1 }}
    colors={["#000000", "#323232"]}
    start={{ x: 0.0, y: 0.0 }}
    end={{ x: 1.0, y: 1.0 }}
    locations={[0.2, 0.8]}
  >
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.hint}>Scan the QR Code to pay</Text>
        <QRCode
          size={size}
          value="1.34,BTC"
          style={styles.qrCode}
          logoSize={size * 0.15}
          logoBackgroundColor="transparent"
        />
        <Text style={styles.address}>
          0xe0eB5ccef15e5e5C7c65D21Fb5d703586109dde0
        </Text>
      </View>
    </SafeAreaView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop:
      Platform.OS === "ios" ? 0 : NativeModules.StatusBarManager.HEIGHT
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  hint: {
    color: "#66ffcc",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16
  },
  address: {
    color: "#FFF",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 16
  }
});

export default WalletScreen;
