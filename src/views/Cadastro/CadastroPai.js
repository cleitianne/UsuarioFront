import React, { Component } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  BackHandler
} from 'react-native'
import theme from '../../theme'
import Button from '../../components/Button'
import HeaderModal from '../../components/HeaderModal'
import validator from '../../lib/validator'
import api from '../../services/ApiService';
export default class CadastroPai extends Component {

  constructor(props) {
    // console.log('props ==> ', props.usuario)
    super(props)
    this.state = {
      usuario: {
          nome: '',
          cpf: '',
          rg: '',
          dataNasc: '',
          nomeMae: '',
          nomePai: '',
      },
      isEdit: false,
      validated: false,
      error: '',
      typeError: '',
      isLoading: false
    }
  }

  componentDidMount() {
    const params = JSON.parse(
        JSON.stringify(this.props.route.params || {}),
      );
      this.setState(params);

    this.didFocusListener = this.props.navigation.addListener("didFocus", () => {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    })
    this.willBlurListener = this.props.navigation.addListener("willBlur", () => {
      this.backHandler.remove()
    })
  }

  handleBackPress = () => {
    const { error } = this.state
    
    if (error)
      this.setState({typeError: '', error: '', isLoading: false})
    else
      this.props.navigation.pop()
    
    return true;
  }

  renderError() {
    const { error } = this.state
    if (error)
      return (
        <Text style={styles.error}>{error}</Text>
      )
  }

  validate(nome) {
    setTimeout(() => {
      let $v = validator.required(nome)
      if (!$v.validated) {
        this.setState($v)
        return
      }

      this.setState($v)
    }, 50)
  }

  cadastrar() {
    const {usuario} = this.state;
    usuario.dataNasc = new Date(usuario.dataNasc.substring(6, 10), usuario.dataNasc.substring(3, 5), usuario.dataNasc.substring(0, 2));
    api.post('api/usuarios', usuario)
    .then((res) => this.props.navigation.navigate('Home', {atualizar: true}))
    .catch(err => console.log('deu ruim', err))
  }

  render() {
    const { navigation } = this.props
    const {  validated, isLoading, usuario } = this.state
    if (isLoading)
      return this.renderLoading()
    else
      return (
        <>
          <HeaderModal icon="md-arrow-back" onPress={() => navigation.pop()} />
          <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.title}>Informe o nome do Pai</Text>
              <TextInput autoFocus={true}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        style={styles.input}
                        returnKeyType="next"
                        autoCapitalize="words"
                        autoCompleteType="name"
                        onChangeText={(pai) => {
                          usuario.nomePai = pai
                          this.setState({usuario},() => {this.validate(pai)} )
                        }}
                        onSubmitEditing={() => this.cadastrar()}
                        value={this.state.usuario.nomePai} 
                        />
              {this.renderError()}
            </ScrollView>
            <Button disabled={!validated} style={styles.buttons} 
                    label={'Continuar'} 
                    onPress={() => this.cadastrar()} />
          </View>
        </>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 30
  },
  buttons: {
    marginTop: 10,
    marginBottom: 15
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
  icon: {
    position: 'absolute', 
    right: 0, 
    top: 50, 
    backgroundColor: 'white', 
    padding: 12
  },
  loading: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.primary
  },
  loadingLogo: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  loadingBody: {
    flex: 1, 
    backgroundColor: 'white', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 30
  },
  message: {
    fontSize: theme.h4, 
    marginTop: 15
  }
})