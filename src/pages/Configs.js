import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCategories from '../services/fetchCategories';
import { saveConfigsAction } from '../redux/actions';

class Configs extends Component {
  state = {
    categories: [],
    category: '',
    difficulty: '',
    type: '',
    initialTimerStr: '30',
    questionsQuantityStr: '5',
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { category, difficulty, type,
      initialTimerStr, questionsQuantityStr } = this.state;
    const { saveConfigs, history } = this.props;
    const initialTimer = +initialTimerStr;
    const questionsQuantity = +questionsQuantityStr;
    saveConfigs({ category, difficulty, type, initialTimer, questionsQuantity });
    history.push('/');
  }

  render() {
    const { categories, category, difficulty, type,
      initialTimerStr, questionsQuantityStr } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <>
        <h1 data-testid="settings-title">Configurações</h1>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="category">
            Categoria
            <select
              name="category"
              id="category"
              value={ category }
              onChange={ handleChange }
            >
              <option value="">Todas</option>
              {categories.length > 0 && categories.map((categ) => (
                <option value={ categ.id } key={ categ.id }>{categ.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Dificuldade
            <select
              name="difficulty"
              id="difficulty"
              value={ difficulty }
              onChange={ handleChange }
            >
              <option value="">Todas</option>
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
            </select>
          </label>
          <label htmlFor="type">
            Tipo
            <select
              name="type"
              id="type"
              value={ type }
              onChange={ handleChange }
            >
              <option value="">Todos</option>
              <option value="multiple">Múltipla escolha</option>
              <option value="boolean">Verdadeiro / Falso</option>
            </select>
          </label>
          <label htmlFor="type">
            Tempo
            <input
              onChange={ handleChange }
              type="number"
              min="5"
              max="30"
              name="initialTimerStr"
              step="5"
              value={ initialTimerStr }
            />
          </label>
          <label htmlFor="type">
            Quantidade de questões
            <input
              onChange={ handleChange }
              type="number"
              max="50"
              min="1"
              name="questionsQuantityStr"
              value={ questionsQuantityStr }
            />
          </label>
          <button type="submit">Salvar</button>
        </form>
      </>
    );
  }
}

Configs.propTypes = {
  saveConfigs: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveConfigs: (configs) => dispatch(saveConfigsAction(configs)),
});

export default connect(null, mapDispatchToProps)(Configs);
