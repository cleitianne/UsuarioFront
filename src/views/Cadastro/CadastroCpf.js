import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import Button from '../../components/Button';
import HeaderModal from '../../components/HeaderModal';
import api from '../../services/ApiService';
import theme from '../../theme';
import validator from '../../lib/validator';

export default class CadastroCpf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario:{
          cpf: '',
          nome: '',
      },
      validated: false,
      error: '',
      typeError: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    const params = JSON.parse(
      JSON.stringify(this.props.route.params || {}),
    );
    this.setState(params);

    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        );
      },
    );
    this.willBlurListener = this.props.navigation.addListener(
      'willBlur',
      () => {
        // this.backHandler.remove();
      },
    );
  }

  handleBackPress = () => {
    const {error} = this.state;

    if (error) {
      this.setState({typeError: '', error: '', isLoading: false});
    } else {
      this.props.navigation.pop();
    }

    return true;
  };

  next() {
    const {usuario} = this.state
    this.props.navigation.navigate('RG', {usuario})
  }

  renderError() {
    const {error} = this.state;
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }
  }

  validateCpf(cpf) {
    return api.get(`api/usuarios/cpf?cpf=${cpf}`)
    .then(data => {
        console.log('deu bom')
        console.log(data.data);
        if (data.data.id == undefined) {
          this.setState({validated: true, error: ''});
        } else {
          this.setState({
            validated: false,
            error: 'Esse CPF já existe na base de dados.',
          });
        }
        
    }).catch(err => {
        console.log('Deu ruim')
        console.log(err)
    });
  
  }

  validate(cpf) {
    setTimeout(() => {
      let $v = validator.required(cpf);
      if (!$v.validated) {
        this.setState($v);
        return;
      }

      $v = validator.cpf(cpf);
      if ($v.validated) {
        this.validateCpf(cpf);
      } else {
        this.setState($v);
      }
      // this.setState($v);
    }, 50);
  }

  renderLoading() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={{marginTop: 30}}
        />
      </View>
    );
  }

  render() {
    const {navigation} = this.props;
    const {validated, isLoading, usuario} = this.state;
    if (isLoading) {
      return this.renderLoading();
    } else {
      return (
        <View style={styles.container}>
          <HeaderModal icon="md-arrow-back" onPress={() => navigation.pop()} />
          <View style={styles.content}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.title}>Informe seu CPF</Text>
              <TextInputMask
                autoFocus={true}
                autoCorrect={false}
                blurOnSubmit={false}
                style={styles.input}
                returnKeyType="done"
                type="cpf"
                onChangeText={cpf => {
                  this.setState(state => {
                    state.usuario.cpf = cpf;
                    return state;
                  });
                  this.validate(cpf);
                }}
                onSubmitEditing={() => this.next()}
                value={usuario.cpf}
              />
              {this.renderError()}
            </ScrollView>
            <Button
              disabled={!validated}
              style={styles.buttons}
              label={'Continuar'}
              onPress={() => this.next()}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  title: {
    fontSize: theme.h2,
    color: theme.primary,
  },
  buttons: {
    marginTop: 10,
    marginBottom: 15,
  },
  error: {
    fontSize: theme.h5,
    color: theme.danger,
    marginTop: 10,
  },
  input: {
    marginTop: 20,
    height: 50,
    fontSize: theme.h3,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});