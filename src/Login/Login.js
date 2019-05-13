import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  Alert
} from "react-native";
import {
  APP_FONTS,
  APP_THEME,
  REGEX,
  APP_ROUTE,
  WEBSERICE_URL,
  WEBSERVICE_METHODS,
  ASYNCSTORAGE_KEYS
} from "../../GlobalConstants/AppConstants";
import login from "../../assets/images/login.png";
import reset from "../../assets/images/reset.png";

export default class Login extends Component {
  state = {
    email: "roshan@gmail.com",
    password: "1231729387981"
  };

  async componentWillMount() {
    const autoLogin = await AsyncStorage.getItem(ASYNCSTORAGE_KEYS.AUTO_LOGIN);
    console.log("autoLogin", autoLogin);
    autoLogin && this.props.navigation.push(APP_ROUTE.DASHBOARD);
  }

  loginPressed = () => {
    try {
      const { email, password } = this.state;
      const isValidEmail = REGEX.EMAIL.test(email) ? true : false;
      const isValidPassword = password.trim().length >= 8 ? true : false;
      if (!isValidEmail && !isValidPassword) {
        this.showErrorAlert(
          "Please enter valid email and password must be minimum 8 characters."
        );
      } else if (!isValidEmail) {
        this.showErrorAlert("Enter valid email.");
      } else if (!isValidPassword) {
        this.showErrorAlert("Password must be minimum 8 characters.");
      } else {
        this.callLoginAPI(email, password);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  showErrorAlert = message => {
    Alert.alert("Error", message, [
      {
        text: "OK"
      }
    ]);
  };

  resetPressed = () => {
    this.textInputEmail.clear();
    this.textInputPassword.clear();
    this.setState({ email: "", password: "" });
  };

  callLoginAPI = (email, password) => {
    fetch(`${WEBSERICE_URL}/${WEBSERVICE_METHODS.LOGIN}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson && responseJson.token) {
          this.props.navigation.push(APP_ROUTE.DASHBOARD);
          AsyncStorage.setItem(
            ASYNCSTORAGE_KEYS.AUTO_LOGIN,
            JSON.stringify(true)
          );
        }
      })
      .catch(e => console.log("e", e));
  };

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.mainView}>
            <View style={{ flex: 1 }}>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>
                  <Text style={{ fontFamily: APP_FONTS.FONT_BOLD }}>Stiga</Text>
                  Soft
                </Text>
              </View>
              <View style={styles.loginTitleView}>
                <Text style={styles.loginTitleText}>Login</Text>
              </View>
            </View>
            <View style={{ flex: 2, marginTop: 40 }}>
              <View style={styles.containerTextInput}>
                <TextInput
                  ref={ref => (this.textInputEmail = ref)}
                  placeholder={"Email"}
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                  style={styles.textInputStyle}
                />
              </View>
              <View style={[styles.containerTextInput]}>
                <TextInput
                  ref={ref => (this.textInputPassword = ref)}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  style={styles.textInputStyle}
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
              </View>
            </View>
            <View
              style={{
                flex: 3,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={styles.loginButtonView}>
                <TouchableOpacity
                  onPress={this.loginPressed}
                  style={styles.loginButtonContainer}
                >
                  <Image
                    style={{
                      width: 40,
                      height: 40
                    }}
                    source={login}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.resetButtonView}>
                <TouchableOpacity
                  onPress={this.resetPressed}
                  style={styles.resetButtonContainer}
                >
                  <Image
                    style={{
                      width: 40,
                      height: 40
                    }}
                    source={reset}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeView: { flex: 1, backgroundColor: APP_THEME.APP_BASE_COLOR },
  mainView: {
    flex: 1,
    flexDirection: "column"
  },
  titleView: { justifyContent: "center", alignItems: "center", marginTop: 20 },
  titleText: {
    fontFamily: APP_FONTS.FONT_LIGHT,
    fontSize: 41,
    color: "#ffffff"
  },
  loginTitleView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  loginTitleText: {
    fontFamily: APP_FONTS.FONT_BOLD,
    fontSize: 24,
    color: APP_THEME.APP_FONT_COLOR_OCEAN_GREEN
  },
  containerTextInput: {
    backgroundColor: APP_THEME.APP_FONT_COLOR_WHITE,
    borderRadius: 8,
    margin: 10,
    height: 44,
    justifyContent: "center"
  },
  errorText: {
    fontFamily: APP_FONTS.FONT_REGULAR,
    fontSize: 14,
    paddingLeft: 5,
    color: APP_THEME.APP_FONT_COLOR_ROYAL_PINK
  },
  loginButtonView: {
    marginLeft: 60,
    marginTop: 20,
    marginBottom: 30,
    marginRight: 30
  },
  loginButtonContainer: {
    alignItems: "center"
  },
  resetButtonView: {
    marginRight: 60,
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 30
  },
  resetButtonContainer: {
    alignItems: "center"
  },
  textInputStyle: {
    paddingLeft: 10
  }
});
