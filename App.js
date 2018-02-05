import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DeviceInfo from "react-native-device-info";

const objToString = obj => {
  var str = "";
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += p + "::" + obj[p] + "\n";
    }
  }
  return str;
};

export default class App extends React.Component {
  addLine(name, value, type = "") {
    return (
      <View key={name} style={styles.line}>
        <Text>
          <Text style={styles.type}>{type} </Text>
          <Text style={styles.name}>{name}(): </Text>
          {type !== "undefined" && <Text style={styles.value}>{value}</Text>}
        </Text>
      </View>
    );
  }

  renderInfo() {
    const ret = [];
    const methods = [
      "getFreeDiskStorage",
      "getTotalDiskCapacity",
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
          if (value === null) {
            value = <Text style={styles.null}>null</Text>;
          } else if (type === "boolean") {
            value = value ? "true" : "false";
          } else if (type == "object") {
            value = objToString(value);
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

  componentWillMount() {
    //this.setState({ ip: false });
    // DeviceInfo.getIPAddress().then(ip => this.setState({ ip }));
  }

  render() {
    // const { ip } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>{this.renderInfo()}</ScrollView>
      </View>
    );
  }
}

const fontSize = 9;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    paddingTop: 20
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingTop: 5,
    paddingBottom: 5
  },
  name: {
    fontWeight: "bold",
    marginRight: 5,
    fontSize
  },
  type: {
    color: "green",
    fontSize
  },
  null: {
    fontStyle: "italic",
    fontSize
  },
  value: {
    fontSize
  }
});
