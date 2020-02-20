import { NavigationActions } from "react-navigation";
import { Alert } from "react-native";

class UnsavedChanges {
  static setNavigator(navigator) {
    this.navigator = navigator;
  }

  static set(bool) {
    this.unsavedChanges = bool;
  }

  static askBeforeNavigating(AppStack) {
    const defaultBehaviour = AppStack.router.getStateForAction;

    AppStack.router.getStateForAction = (action, state) => {
      if (!this.unsavedChanges) return defaultBehaviour(action, state);

      this.showAlert({ onConfirm: () => this.navigate(action, state) });
      return null;
    };
  }

  // private

  static showAlert({ onConfirm }) {
    Alert.alert("Warning", "There are unsaved changes.", [
      { text: "Cancel" },
      { text: "OK", onPress: onConfirm },
    ]);
  }

  static navigate(action, state) {
    this.set(false);
    this.navigator.dispatch(action, state);
  }
}

export default UnsavedChanges;
