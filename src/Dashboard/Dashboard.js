import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  AsyncStorage
} from "react-native";
import { APP_FONTS, APP_THEME } from "../../GlobalConstants/AppConstants";
import { connect } from "react-redux";
import { addTodo, deleteTodo } from "../../Redux/actions";
import TodoItemCell from "./TodoItemCell";
import AddTodo from "./AddTodo";

class Dashboard extends Component {
  state = {
    isAddTodoVisible: false
  };

  logoutPressed = async () => {
    await AsyncStorage.clear();
    if (this.props.navigation && this.props.navigation) {
      this.props.navigation.pop();
    }
  };

  showAddTodo = value => {
    this.setState({ isAddTodoVisible: value });
  };

  addTodo = inputText => {
    if (inputText === "") return;
    this.setState({ isAddTodoVisible: false });
    this.props.dispatchAddTodo({
      title: inputText
    });
  };

  deleteTodo = todo => {
    this.props.dispatchDeleteTodo(todo);
  };

  _keyExtractor = (item, index) => `${index}`;

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.mainView}>
            <View style={styles.topView}>
              <View style={styles.buttonViewStyle}>
                <TouchableOpacity
                  onPress={() => this.showAddTodo(true)}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonTitleText}>Add Todo</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>To-Do's</Text>
              </View>
              <View style={styles.buttonViewStyle}>
                <TouchableOpacity
                  onPress={this.logoutPressed}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonTitleText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 6 }}>
              <FlatList
                data={this.props.todo}
                style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => (
                  <TodoItemCell item={item} deleteTodo={this.deleteTodo} />
                )}
              />
            </View>
          </View>
          <AddTodo
            isDialogVisible={this.state.isAddTodoVisible}
            title={"Add Todo"}
            message={""}
            hintInput={""}
            submitInput={inputText => {
              this.addTodo(inputText);
            }}
            closeDialog={() => {
              this.showAddTodo(false);
            }}
          />
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
  topView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  titleView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontFamily: APP_FONTS.FONT_BOLD,
    fontSize: 30,
    color: APP_THEME.APP_FONT_COLOR_WHITE
  },
  buttonViewStyle: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    backgroundColor: APP_THEME.APP_FONT_COLOR_OCEAN_GREEN,
    width: 80,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTitleText: {
    fontFamily: APP_FONTS.FONT_SEMIBOLD,
    fontSize: 14,
    color: APP_THEME.APP_FONT_COLOR_WHITE
  }
});

mapStateToProps = state => {
  return {
    todo: state.todo.todo
  };
};

mapDispatchToProps = dispatch => {
  return {
    dispatchAddTodo: todo => dispatch(addTodo(todo)),
    dispatchDeleteTodo: todo => dispatch(deleteTodo(todo)),
    dispatchClearState: todo => dispatch(clearState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
