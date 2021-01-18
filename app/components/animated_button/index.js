import { TouchableWithoutFeedback, Animated, ActivityIndicator, View, Text } from 'react-native';
import PropTypes from 'prop-types';
//import styles from "./styles.js";

export default class Component extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleFontFamily: PropTypes.string,
    titleFontSize: PropTypes.number,
    titleWeight: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderRadius: PropTypes.number,
    activityIndicatorColor: PropTypes.string,
    onPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    titleColor: 'white',
    activityIndicatorColor: 'white',
    textTransform: "uppercase",
    borderRadius: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      showLoading: false,
      title: props.title
    };

    this.loadingValue = {
      width: new Animated.Value(props.width),
      borderRadius: new Animated.Value(props.borderRadius),
      opacity: new Animated.Value(1)
    };
  }

  changeTitle(newTitle){
    this.setState({ title: newTitle });
  }

  showLoading(showLoading) {
    if (showLoading) {
      this._loadingAnimation(this.props.width, this.props.height, this.props.borderRadius, this.props.height / 2, 1, 0);
      this.setState({ showLoading: showLoading });
    } else {
      setTimeout(() => {
        this._loadingAnimation(this.props.height, this.props.width, this.props.height / 2, this.props.borderRadius, 0, 1);
        this.setState({ showLoading: showLoading });
      }, 1000);
    }
  }

  _loadingAnimation(widthStart, widthEnd, borderRadiusStart, borderRadiusEnd, opacityStart, opacityEnd) {
    if (this.loadingValue.width._value !== widthEnd) {
      this.loadingValue.width.setValue(widthStart);
      this.loadingValue.opacity.setValue(opacityStart);
      this.loadingValue.borderRadius.setValue(borderRadiusStart);

      Animated.timing(this.loadingValue.width, {
        toValue: widthEnd,
        duration: 400
      }).start();

      Animated.timing(this.loadingValue.borderRadius, {
        toValue: borderRadiusEnd,
        duration: 400
      }).start();

      Animated.timing(this.loadingValue.opacity, {
        toValue: opacityEnd,
        duration: 300
      }).start();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={!this.state.showLoading ? this.props.onPress : null}>
          <Animated.View
            style={[
              styles.containerButton,
              {
                width: this.loadingValue.width,
                height: this.props.height,
                backgroundColor: this.props.backgroundColor,
                borderWidth: this.props.borderWidth,
                borderRadius: this.loadingValue.borderRadius
              }
            ]}
          >
            {this.state.showLoading ? this._renderIndicator() : this._renderTitle()}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _renderTitle() {
    return (
      <Animated.Text
        style={[
          styles.buttonText,
          {
            opacity: this.loadingValue.opacity,
            color: "white",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontFamily: "Roboto-Medium",
            fontSize: this.props.titleFontSize,
            fontWeight: this.props.titleWeight
          }
        ]}
      >
        {this.state.title}
      </Animated.Text>
    );
  }

  _renderIndicator() {
    return <ActivityIndicator color={this.props.activityIndicatorColor} />;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  containerButton: {
    justifyContent: 'center'
  },
  buttonText: {
    color: "white",
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});