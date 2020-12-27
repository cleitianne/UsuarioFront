import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableHighlight,
    Image,
    BackHandler
  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { debounce } from 'debounce';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../services/ApiService';
import Profile from '../assets/profile.png';
import theme from '../theme';
import Button from '../components/Button';
import Header from '../components/Header';
const Home = ({navigation, route}) => {
  const [usuarios, setUsuarios] = useState([]);
  function findBySearch (search) {
    api.get(`api/usuarios?nome=${search}`)
        .then(data => {
            setUsuarios(data.data)
        }).catch(err => {
            console.log('Deu ruim')
            console.log(err)
        });
  }

  function findBySearchDebounce(search) {
    debounce(findBySearch(search), 200);
  }

  function removerUsuario(id) {
    console.log('Removendo', id)
    api.post(`api/usuarios/${id}`)
    .then(() => {
      findBySearch('');
    })
  }

  useEffect(() => {
    findBySearch('');
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    findBySearch('');
  }, [route]);

  return (
        <View style={styles.container}>
          <Header
            // icon="exit-outline"
            onSearch={findBySearch}
            onSearchChangeText={findBySearchDebounce} />
            <>
            {usuarios.length == 0 ? (
              <View style={styles.containerTextoSemResultado}>
                <Text style={styles.textoSemResultado}>Não há registros.</Text>
              </View>
              
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={usuarios}
                renderItem={({item}) => (
                  <TouchableHighlight style={styles.item}  onPress={() => {navigation.navigate('Usuario', {usuario: item})}} underlayColor="#d7d7d7"> 
                    <>
                      <View style={styles.itemStart}>
                        <Image source={Profile} style={[styles.itemImage]} />
                      </View>
                      <View style={styles.itemCenter}>
                        <Text style={styles.itemTextoNome}>{item.nome}</Text>
                        <Text style={styles.itemTextoCpf}>CPF: {item.cpf}</Text>
                      </View>
                      <TouchableHighlight style={styles.itemEnd} onPress={() => removerUsuario(item.id)}>
                        <Icon name="close-circle" color='red' size={25}  />
                      </TouchableHighlight>
                    </>
                  </TouchableHighlight>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
            </>
            
          <View style={styles.buttons}>
            <Button onPress={() => navigation.navigate('Nome')}
            label='Adicionar Usuário'></Button>
          </View>
          
        </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      buttons: {
        marginTop: 10,
        marginBottom: 15,
        marginHorizontal: 30,
      },
      title: {
        fontSize: theme.h2, 
        color: theme.primary
      },
      error: {
        fontSize: theme.h5,
        color: theme.danger,
        marginTop: 10
      },
      input: {
        marginTop: 20,
        height: 50, 
        fontSize: theme.h3
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#D5D5D5',
        paddingBottom: 10,
        paddingTop: 15,
        paddingHorizontal: 15
      },
      itemStart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      itemCenter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
      },
      itemEnd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      itemImage: {
        width: 55,
        height: 55,
        borderRadius: 30,
        borderWidth: 3,
      },
      itemTextoNome: {
        fontSize: theme.h4,
        color: 'black',
        fontWeight: "bold"
      },
      itemTextoCpf: {
        fontSize: theme.h5,
        color: 'black',
      },
      itemTextoNumero: {
        fontSize: theme.h5,
        color: '#707070',
        marginRight: 10
      },
      textoSemResultado: {
        textAlign: 'center',
        fontSize: theme.h4,
        padding: 20
      },
      containerTextoSemResultado: {
        justifyContent: 'flex-start', 
        flex: 1
      }
    
  });

  export default Home;
  