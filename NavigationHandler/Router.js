import { createStackNavigator, createAppContainer } from "react-navigation";
import { APP_ROUTE } from "../GlobalConstants/AppConstants";
import Login from "../src/Login/Login";
import Dashboard from "../src/Dashboard/Dashboard";

const navigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Dashboard: {
      screen: Dashboard
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  },
  {
    initialRouteName: APP_ROUTE.LOGIN
  }
);

const Router = createAppContainer(navigator);

export default Router;
