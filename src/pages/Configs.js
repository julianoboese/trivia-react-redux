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
    const { category, difficulty, type } = this.state;
    const { saveConfigs, history } = this.props;
    saveConfigs({ category, difficulty, type });
    history.push('/');
  }

  render() {
    const { categories, category, difficulty, type } = this.state;
    return (
      <>
        <h1 data-testid="settings-title">Configurações</h1>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="category">
            Categoria
            <select
              name="category"
              id="category"
              value={ category }
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
            >
              <option value="">Todos</option>
              <option value="multiple">Múltipla escolha</option>
              <option value="boolean">Verdadeiro / Falso</option>
            </select>
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
