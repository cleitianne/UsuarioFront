import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.grey,
    elevation: 12,
    backgroundColor: 'white',
  },
  icon: {
    width: 25,
    marginLeft: 15,
    marginRight: 15,
  },
  containerSearch: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  input: {
    height: 50,
    fontSize: theme.h3,
  },
});

const Header = ({
  icon,
  onPress = () => {},
  onSearch = () => {},
  onSearchChangeText = () => {},
}) => {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {});
  function renderSearch() {
    return (
      <View style={styles.containerSearch}>
        <TouchableHighlight
          onPress={() => {
            setIsSearch(false);
            setSearch('');
            onSearch('');
          }}
          underlayColor="white"
          style={styles.icon}
        >
          <Icon name="ios-close-circle" size={25} color={theme.primary} />
        </TouchableHighlight>

        <TextInput
          autoFocus
          // autoCorrect={false}
          blurOnSubmit
          style={styles.input}
          returnKeyType="search"
          autoCompleteType="name"
          placeholder="Pesquisar..."
          onChangeText={(text) => {
            setSearch(text);
            onSearchChangeText(text);
          }}
          onSubmitEditing={() => onSearch(search)}
          value={search}
        />
      </View>
    );
  }
  if (isSearch) {
    return renderSearch();
  }
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={onPress}
        underlayColor="white"
        style={styles.icon}
      >
        <Icon name={icon} size={25} color={theme.primary} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          setIsSearch(true);
        }}
        underlayColor="white"
        style={styles.icon}
      >
        <Icon name="md-search" size={25} color={theme.grey} />
      </TouchableHighlight>
    </View>
  );
};

export default Header;