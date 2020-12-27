import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import theme from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HeaderModal extends Component {
  static defaultProps = {
    icon: '',
    title: '',
    styleTitle: null,
    onPress: () => {},
  };

  constructor(props) {
    super(props);
  }

  renderLeft() {
    const { left } = this.props;
    return left;
  }

  render() {
    const { icon, onPress, title, styleTitle } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight
            onPress={onPress}
            underlayColor="white"
            style={styles.icon}
          >
            <Icon name={icon} size={25} color="black" />
          </TouchableHighlight>
          {title !== '' ? (
            <Text style={styleTitle ? styleTitle : styles.title}>{title}</Text>
          ) : null}
        </View>
        {this.renderLeft()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    marginLeft: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: theme.h4,
    color: 'black',
  },
});
