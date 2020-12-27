import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native'

import theme from '../theme'

export default class Button extends Component {

  static defaultProps = {
    label: '',
    transparent: false,
    inverse: false,
    disabled: false,
    onPress: () => {},
    style: {}
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {transparent, inverse, onPress, label, style, disabled} = this.props
    return (
      <View style={style}>
        <TouchableHighlight style={[styles.button, 
                                    transparent && styles.buttonTransparent, 
                                    inverse && styles.buttonInverse,
                                    disabled && styles.buttonDisabled]} 
                            onPress={onPress} 
                            underlayColor={inverse ? '#d7d7d7' : '#001570'}
                            disabled={disabled} >
              <>
                <Text style={[styles.label, 
                              inverse && styles.labelInverse]}>
                  {label.toUpperCase()}
                </Text>
              </>
        </TouchableHighlight>
      </View>
  )}

}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.primary,
    height: 41,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 1,
  },
  buttonTransparent: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonDisabled: {
    backgroundColor: '#d7d7d7',
  },
  buttonInverse: {
    backgroundColor: 'white',
    borderWidth: 0.1,
    borderColor: theme.grey
  },
  labelInverse: {
    color: theme.primary,
  },
  label: {
    fontSize: theme.h5,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center'
  },
  icon: {
    left: 0, 
    position: 'absolute', 
    marginLeft: 20
  }
})