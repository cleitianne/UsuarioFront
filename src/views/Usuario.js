import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  ImageBackground,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import theme from '../theme';
import ProfileModal from '../assets/profile_modal.png';

const TextIcon = ({ font = '', icon = '', text }) => {
  return (
    <View style={styles.containerIconText}>
      {icon !== '' ? (
        <>
          {font === 'f' ? (
            <FontAwesome
              name={icon}
              size={25}
              color='black'
              style={styles.icon}
            />
          ) : (
            <>
            {
              font === 'm' ? (
                <Material
                  name={icon}
                  size={25}
                  color='black'
                  style={styles.icon}
                />
              ) : (
                <Fontisto
                  name={icon}
                  size={25}
                  color='black'
                  style={styles.icon}
                />
              )
            }
            </>
            
          )}
        </>
      ) : null}

      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const Usuario = ({navigation, route}) => {
    function formatData(dataNasc = '')
    {
        return `${dataNasc.substring(8,10)}/${dataNasc.substring(5,7)}/${dataNasc.substring(0,4)}`
    }
    const { usuario } = route.params;
    return (
        <View style={styles.container}>
          <ImageBackground
            style={styles.userImage}
            source={ProfileModal}>
            <Icon
              name="md-arrow-back"
              size={25}
              color="black"
              style={styles.icon}
              onPress={() => navigation.pop()}
            />
            <View style={styles.containerImage}>
              <View style={styles.userBackgroundView}>
                <Text style={styles.userName}>{usuario.nome}</Text>
              </View>
            </View>
          </ImageBackground>
          <ScrollView style={styles.containerScroll}>
          <TextIcon
              font='m'
              icon="card-text"
              text={`${usuario.cpf}`}
          />
          <TextIcon
              font='m'
              icon="card-account-details"
              text={`${usuario.rg}`}
          />
          <TextIcon
              font='f'
              icon="birthday-cake"
              text={`${formatData(usuario.dataNasc)}`}
          />
          <TextIcon
              icon="female"
              text={`${usuario.nomeMae}`}
          />
          <TextIcon
              icon="male"
              text={`${usuario.nomePai}`}
          />
          <TextIcon
              icon="date"
              text={`${formatData(usuario.dataCadastro)}`}
          />
          </ScrollView>
          {/* <View style={{flex: 1, marginLeft: 15}}>
              <Text style={{fontSize: theme.h3}}>CPF: {usuario.cpf}</Text>
              <Text style={{fontSize: theme.h3}}>RG: {usuario.rg}</Text>
              <Text style={{fontSize: theme.h3}}>Data de Nascimento: {formatData(usuario.dataNasc)}</Text>
              <Text style={{fontSize: theme.h3}}>Mãe: {usuario.nomeMae}</Text>
              <Text style={{fontSize: theme.h3}}>Pai: {usuario.nomePai}</Text>
              <Text style={{fontSize: theme.h3}}>Data de Cadastro: {formatData(usuario.dataCadastro)}</Text>
          </View> */}
        </View>
    )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  userImage: {
    width: 400,
    height: 300,
  },
  userName: {
    color: 'white',
    fontSize: theme.h3,
    marginLeft: 10,
  },
  userBackgroundView: {
    backgroundColor: '#00000060',
    height: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  // icon: {
  //   margin: 10,
  // },
  containerScroll: { flex: 1, margin: 10 },
  text: {
    fontSize: theme.h3,
    color: 'black',
  },
  containerIconText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 2,
    padding: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default Usuario;