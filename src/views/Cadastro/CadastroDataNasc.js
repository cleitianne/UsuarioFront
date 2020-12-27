import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import theme from '../../theme';
import Button from '../../components/Button';
import HeaderModal from '../../components/HeaderModal';
import validator from '../../lib/validator';

export default class CadastroDataNasc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario:{
        nome: '',
        cpf: '',
        rg: '',
        dataNasc: '',
      },
      isEdit: false,
      validated: false,
      error: '',
    };
  }

  componentDidMount() {
    const params = JSON.parse(
      JSON.stringify(this.props.route.params || {}),
    );
    this.setState(params);
  }

  renderError() {
    const {error} = this.state;
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }
  }

  validate(dataNascimento) {
    setTimeout(() => {
      let $v = validator.required(dataNascimento);
      if (!$v.validated) {
        this.setState($v);
        return;
      }

      let validated = this.dataNascimentoRef.isValid();
      $v = {
        validated,
        error: validated ? '' : 'A data é inválida.',
      };

      this.setState($v);
    }, 50);
  }

  next() {
    const {usuario} = this.state
    this.props.navigation.navigate('Mae', {usuario})
  }


  render() {
    const {navigation} = this.props;
    const {validated, usuario} = this.state;
    return (
      <>
        <HeaderModal icon="md-arrow-back" onPress={() => navigation.pop()} />
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Digite a sua data de nascimento</Text>
            <TextInputMask
              autoFocus={true}
              autoCorrect={false}
              blurOnSubmit={false}
              style={styles.input}
              returnKeyType="next"
              placeholder="DD/MM/AAAA"
              ref={ref => (this.dataNascimentoRef = ref)}
              type="datetime"
              options={{
                format: 'DD/MM/YYYY',
              }}
              onChangeText={dataNascimento => {
                usuario.dataNasc = dataNascimento
                this.setState({usuario}, () => {
                  this.validate(dataNascimento)
                });
              }}
              onSubmitEditing={() => this.next()}
              value={usuario.dataNasc}
            />
            {this.renderError()}
          </ScrollView>
          <Button
            disabled={!validated}
            style={styles.buttons}
            label="Continuar"
            onPress={() => this.next()}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  buttons: {
    marginTop: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: theme.h2,
    color: theme.primary,
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
});
