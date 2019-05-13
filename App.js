import React, { Component } from "react";
import { AppLoading, Font, Asset } from "expo";
import { Provider } from "react-redux";
import Router from "./NavigationHandler/Router";
import configureStore from "./Redux/configureStore";

const store = configureStore();

export default class App extends Component {
  state = {
    isReady: false
  };

  cacheFonts = font => {
    Font.loadAsync(font);
  };

  cacheImages = images => {
    return images.map(image => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  _loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/login.png"),
        require("./assets/images/reset.png"),
        require("./assets/images/Trash-White.png")
      ]),
      Font.loadAsync({
        "Poppins-Bold": require("./assets/Fonts/Poppins-Bold.ttf"),
        "Poppins-Thin": require("./assets/Fonts/Poppins-Thin.ttf"),
        "Poppins-Light": require("./assets/Fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("./assets/Fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("./assets/Fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("./assets/Fonts/Poppins-SemiBold.ttf"),
        "Poppins-ExtraBold": require("./assets/Fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("./assets/Fonts/Poppins-ExtraLight.ttf"),
        "Material-Design-Iconic-Font": require("./assets/Fonts/Material-Design-Iconic-Font.ttf")
      })
    ]);
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
