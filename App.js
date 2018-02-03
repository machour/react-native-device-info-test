import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DeviceInfo from "react-native-device-info";

export default class App extends React.Component {
  addLine(name, value, type = "") {
    return (
      <View key={name}>
        <Text style={styles.name}>DeviceInfo.{name}():</Text>
        <Text style={styles.type}>{type}:</Text>
        <Text>{value}</Text>
      </View>
    );
  }

  renderInfo() {
    const ret = [];
    const methods = [
      "getUniqueID",
      "getManufacturer",
      "getBrand",
      "getModel",
      "getDeviceId",
      "is24Hour",
      "getSystemName",
      "getSystemVersion",
      "getBundleId",
      "getBuildNumber",
      "getVersion",
      "getReadableVersion",
      "getDeviceName",
      "getUserAgent",
      "getDeviceLocale",
      "getDeviceCountry",
      "getTimezone",
      "isEmulator",
      "isTablet",
      "getAPILevel",
      "getInstanceID",
      "getPhoneNumber",
      "getFirstInstallTime",
      "getLastUpdateTime",
      "getSerialNumber",
      "getIPAddress",
      "getMACAddress",
      "getCarrier",
      "getTotalMemory",
      "getMaxMemory",
      "getApplicationName"
    ];
    for (let i = 0; i < methods.length; i++) {
      if (DeviceInfo[methods[i]]) {
        try {
          let value = DeviceInfo[methods[i]]();
          let type = typeof value;
          if (type === "boolean") {
            value = value ? "true" : "false";
          }
          ret.push(this.addLine(methods[i], value, type));
        } catch (e) {
          ret.push(this.addLine(methods[i], `⚠️ ${e.message}`));
        }
      } else {
        ret.push(
          this.addLine(
            methods[i],
            `⚠️ DeviceInfo.${methods[i]} don\'t exist on`
          )
        );
      }
    }
    return ret;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>{this.renderInfo()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    paddingTop: 40
  },
  line: {
    flexDirection: "row"
  },
  name: {
    fontWeight: "bold",
    marginRight: 5,
    paddingTop: 10
  },
  type: {
    color: "green"
  }
});
