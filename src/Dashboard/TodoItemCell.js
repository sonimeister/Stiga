import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Swipeout from "react-native-swipeout";
import { APP_THEME, APP_FONTS } from "../../GlobalConstants/AppConstants";
import TrashImage from "../../assets/images/Trash-White.png";

export default class TodoItemCell extends React.PureComponent {
  render() {
    const { item } = this.props;

    let swipeBtns = [
      {
        text: "Delete",
        onPress: () => this.props.deleteTodo(item),
        component: (
          <View
            style={{
              backgroundColor: "#B63D2D",
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={TrashImage}
              style={{ height: 21, width: 18 }}
              resizeMode="contain"
            />
          </View>
        ),
        autoClose: true
      }
    ];

    return (
      <Swipeout
        right={swipeBtns}
        key={item.title}
        style={{ backgroundColor: "#B63D2D" }}
      >
        <View style={styles.container}>
          <Text style={styles.rowHeaderText}>{item.title}</Text>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 61,
    flexDirection: "row",
    backgroundColor: APP_THEME.APP_BASE_COLOR,
    borderBottomColor: "#D0D0D0",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  rowHeaderText: {
    flexWrap: "wrap",
    fontSize: 16,
    fontFamily: APP_FONTS.FONT_REGULAR,
    color: APP_THEME.APP_FONT_COLOR_WHITE
  }
});
