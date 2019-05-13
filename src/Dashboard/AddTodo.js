import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import { APP_FONTS, APP_THEME } from "../../GlobalConstants/AppConstants";
export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { inputModal: "", openning: true };
  }

  render() {
    let title = this.props.title || "";
    let hintInput = this.props.hintInput || "";
    let value = "";
    if (!this.state.openning) {
      value = this.state.inputModal;
    } else {
      value = this.props.initValueTextInput
        ? this.props.initValueTextInput
        : "";
    }

    let textProps = this.props.textInputProps || null;
    let modalStyleProps = this.props.modalStyle || {};
    let dialogStyleProps = this.props.dialogStyle || {};
    var cancelText = this.props.cancelText || "Cancel";
    var submitText = this.props.submitText || "Submit";
    cancelText = Platform.OS === "ios" ? cancelText : cancelText.toUpperCase();
    submitText = Platform.OS === "ios" ? submitText : submitText.toUpperCase();

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isDialogVisible}
        onRequestClose={() => {
          this.props.closeDialog();
          this.setState({ inputModal: "" });
        }}
      >
        <View style={[styles.container, { ...modalStyleProps }]}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => {
              this.props.closeDialog();
              this.setState({ inputModal: "", openning: true });
            }}
          >
            <View style={[styles.modal_container, { ...dialogStyleProps }]}>
              <View style={styles.modal_body}>
                <Text style={styles.title_modal}>{title}</Text>
                <Text
                  style={[
                    this.props.message ? styles.message_modal : { height: 0 }
                  ]}
                >
                  {this.props.message}
                </Text>
                <TextInput
                  style={styles.input_container}
                  autoCorrect={
                    textProps && textProps.autoCorrect == false ? false : true
                  }
                  autoCapitalize={
                    textProps && textProps.autoCapitalize
                      ? textProps.autoCapitalize
                      : "none"
                  }
                  clearButtonMode={
                    textProps && textProps.clearButtonMode
                      ? textProps.clearButtonMode
                      : "never"
                  }
                  clearTextOnFocus={
                    textProps && textProps.clearTextOnFocus == true
                      ? textProps.clearTextOnFocus
                      : false
                  }
                  keyboardType={
                    textProps && textProps.keyboardType
                      ? textProps.keyboardType
                      : "default"
                  }
                  autoFocus={true}
                  onKeyPress={() => this.setState({ openning: false })}
                  underlineColorAndroid="transparent"
                  placeholder={hintInput}
                  onChangeText={inputModal => this.setState({ inputModal })}
                  value={value}
                />
              </View>
              <View style={styles.btn_container}>
                <TouchableOpacity
                  style={styles.touch_modal}
                  onPress={() => {
                    this.props.closeDialog();
                    this.setState({ inputModal: "", openning: true });
                  }}
                >
                  <Text style={styles.btn_modal_left}>{cancelText}</Text>
                </TouchableOpacity>
                <View style={styles.divider_btn} />
                <TouchableOpacity
                  style={styles.touch_modal}
                  onPress={() => {
                    this.props.submitInput(value);
                    this.setState({ inputModal: "", openning: true });
                  }}
                >
                  <Text style={styles.btn_modal_right}>{submitText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: {
        backgroundColor: "rgba(0,0,0,0.62)"
      }
    })
  },
  modal_container: {
    marginLeft: 30,
    marginRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor: APP_THEME.APP_COLOR_IRON,
        borderRadius: 10,
        minWidth: 300
      },
      android: {
        backgroundColor: APP_THEME.APP_FONT_COLOR_WHITE,
        elevation: 24,
        minWidth: 280,
        borderRadius: 5
      }
    })
  },
  modal_body: {
    ...Platform.select({
      ios: {
        padding: 10
      },
      android: {
        padding: 24
      }
    })
  },
  title_modal: {
    fontFamily: APP_FONTS.FONT_SEMIBOLD,
    fontSize: 20,
    ...Platform.select({
      ios: {
        marginTop: 10,
        textAlign: "center",
        marginBottom: 5
      },
      android: {
        textAlign: "left"
      }
    })
  },
  message_modal: {
    fontFamily: APP_FONTS.FONT_REGULAR,
    fontSize: 16,
    ...Platform.select({
      ios: {
        textAlign: "center",
        marginBottom: 10
      },
      android: {
        textAlign: "left",
        marginTop: 20
      }
    })
  },
  input_container: {
    textAlign: "left",
    fontSize: 16,
    color: "rgba(0,0,0,0.54)",
    ...Platform.select({
      ios: {
        backgroundColor: "white",
        borderRadius: 5,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: APP_THEME.APP_COLOR_SILVER_CHALICE,
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10
      },
      android: {
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: APP_THEME.APP_COLOR_PERSIAN_GREEN
      }
    })
  },
  btn_container: {
    flex: 1,
    flexDirection: "row",
    ...Platform.select({
      ios: {
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: APP_THEME.APP_COLOR_SILVER_CHALICE,
        maxHeight: 48
      },
      android: {
        alignSelf: "flex-end",
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8
      }
    })
  },
  divider_btn: {
    ...Platform.select({
      ios: {
        width: 1,
        backgroundColor: APP_THEME.APP_COLOR_SILVER_CHALICE
      },
      android: {
        width: 0
      }
    })
  },
  touch_modal: {
    ...Platform.select({
      ios: {
        flex: 1
      },
      android: {
        paddingRight: 8,
        minWidth: 64,
        height: 36
      }
    })
  },
  btn_modal_left: {
    ...Platform.select({
      fontFamily: APP_FONTS.FONT_SEMIBOLD,
      ios: {
        fontSize: 18,
        color: APP_THEME.APP_COLOR_ROYAL_BLUE,
        textAlign: "center",
        borderRightWidth: 5,
        borderColor: APP_THEME.APP_COLOR_SILVER_CHALICE,
        padding: 10,
        height: 48,
        maxHeight: 48
      },
      android: {
        textAlign: "right",
        color: APP_THEME.APP_COLOR_PERSIAN_GREEN,
        padding: 8
      }
    })
  },
  btn_modal_right: {
    ...Platform.select({
      fontFamily: APP_FONTS.FONT_SEMIBOLD,
      ios: {
        fontSize: 18,
        color: APP_THEME.APP_COLOR_ROYAL_BLUE,
        textAlign: "center",
        padding: 10
      },
      android: {
        textAlign: "right",
        color: APP_THEME.APP_COLOR_PERSIAN_GREEN,
        padding: 8
      }
    })
  }
});
