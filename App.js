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

const API = [
  {name: "getAPILevel", type: 'direct'},
  {name: "getApplicationName", type: 'direct'},
  {name: "getBrand", type: 'direct'},
  {name: "getBuildNumber", type: 'direct'},
  {name: "getBundleId", type: 'direct'},
  {name: "getCarrier", type: 'direct'},
  {name: "getDeviceCountry", type: 'direct'},
  {name: "getDeviceId", type: 'direct'},
  {name: "getDeviceLocale", type: 'direct'},
  {name: "getDeviceName", type: 'direct'},
  {name: "getFirstInstallTime", type: 'direct'},
  {name: "getFontScale", type: 'direct'},
  {name: "getFreeDiskStorage", type: 'direct'},
  {name: "getInstanceID", type: 'direct'},
  {name: "getIPAddress", type: 'promise'},
  {name: "getLastUpdateTime", type: 'direct'},
  {name: "getMACAddress", type: 'promise'},
  {name: "getManufacturer", type: 'direct'},
  {name: "getMaxMemory", type: 'direct'},
  {name: "getModel", type: 'direct'},
  {name: "getPhoneNumber", type: 'direct'},
  {name: "getReadableVersion", type: 'direct'},
  {name: "getSerialNumber", type: 'direct'},
  {name: "getSystemName", type: 'direct'},
  {name: "getSystemVersion", type: 'direct'},
  {name: "getTimezone", type: 'direct'},
  {name: "getTotalDiskCapacity", type: 'direct'},
  {name: "getTotalMemory", type: 'direct'},
  {name: "getUniqueID", type: 'direct'},
  {name: "getUserAgent", type: 'direct'},
  {name: "getVersion", type: 'direct'},
  {name: "is24Hour", type: 'direct'},
  {name: "isEmulator", type: 'direct'},
  {name: "isTablet", type: 'direct'},
  {name: "isPinOrFingerprintSet", type: 'callback'}
];

const formatValue = (value, type) => {
  if (value === null) {
    return <Text style={styles.null}>null</Text>;
  }
  if (type === "boolean") {
    return value ? "true" : "false";
  }
  
  if (type == "object") {
    return objToString(value);
  }

  return value;
}

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

    API.forEach(method => {
      switch (method.type) {
        case 'direct':
          try {
            let value = DeviceInfo[method.name]();
            let type = typeof value;
            
            ret.push(this.addLine(method.name, formatValue(value, type), type));
          } catch (e) {
            ret.push(this.addLine(method.name, `⚠️ ${e.message}`));
          }
        break;

        case 'callback':
        case 'promise':
          const value = this.state[method.name];
          if (value === 'fetching...') {
            ret.push(this.addLine(method.name, 'Loading...', '?'));
          } else {
            const type = typeof value;
            ret.push(this.addLine(method.name, formatValue(value, type), type));
          }
        break;

        
      }
    });

    return ret;
  }

  componentWillMount() {
    console.log('mounting');

    const state = {};
    API.forEach(method => {
      switch (method.type) {
        case 'callback':
        case 'promise':
          state[method.name] = "fetching...";
        break;
      }
    });

    this.setState(state);

    API.forEach(method => {
      switch (method.type) {
        case 'callback':
          DeviceInfo[method.name]()(value => {
            const obj = {};
            obj[method.name] = value;
            this.setState(obj);
          });
        break;
        case 'promise':
          DeviceInfo[method.name]().then(value => {
            const obj = {};
            obj[method.name] = value;
            this.setState(obj);
          });
        break;
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderInfo()}
        </ScrollView>
      </View>
    );
  }
}

const fontSize = 15;
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
