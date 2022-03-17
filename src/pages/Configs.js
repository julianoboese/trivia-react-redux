import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Button, Container, FormControl, InputLabel,
  MenuItem, Paper, Select, Slider, Stack, Typography } from '@mui/material';
import getCategories from '../services/fetchCategories';
import { saveConfigsAction } from '../redux/actions';

class Configs extends Component {
  state = {
    categories: [],
    category: '',
    difficulty: '',
    type: '',
    initialTimerStr: '30',
    quantityStr: '5',
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
      initialTimerStr, quantityStr } = this.state;
    const { saveConfigs, history } = this.props;
    const initialTimer = +initialTimerStr;
    const quantity = +quantityStr;
    saveConfigs({ category, difficulty, type, initialTimer, quantity });
    history.push('/');
  }

  renderForm = () => {
    const { categories, category, difficulty, type,
      initialTimerStr, quantityStr } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={ handleSubmit }>
        <Stack direction="row" spacing={ 2 } sx={ { my: 4 } }>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={ category }
              label="Category"
              onChange={ handleChange }
            >
              <MenuItem value="">All</MenuItem>
              {categories.length > 0 && categories.map((categ) => (
                <MenuItem value={ categ.id } key={ categ.id }>{categ.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="difficulty"
              value={ difficulty }
              label="Difficulty"
              onChange={ handleChange }
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="type"
              value={ type }
              label="Type"
              onChange={ handleChange }
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="multiple">Multiple options</MenuItem>
              <MenuItem value="boolean">True / False</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={ 8 } justifyContent="center" sx={ { my: 4 } }>
          <Box sx={ { width: 300 } }>
            <Typography id="input-slider" gutterBottom>
              Time
            </Typography>
            <Slider
              aria-label="Temperature"
              name="initialTimerStr"
              value={ initialTimerStr }
              valueLabelDisplay="auto"
              step={ 5 }
              marks
              min={ 5 }
              max={ 60 }
              onChange={ handleChange }
            />
          </Box>
          <Box sx={ { width: 300 } }>
            <Typography id="input-slider" gutterBottom>
              Number of questions
            </Typography>
            <Slider
              aria-label="Temperature"
              name="quantityStr"
              value={ quantityStr }
              valueLabelDisplay="auto"
              min={ 1 }
              max={ 50 }
              onChange={ handleChange }
            />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={ 2 } sx={ { my: 4 } }>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="success"
          >
            Save
          </Button>
        </Stack>
      </form>
    );
  }

  render() {
    return (
      <Container
        sx={ { pt: 8,
          bgcolor: '#FFB834',
          minWidth: '100vw',
          height: '100vh',
          textAlign: 'center' } }
      >
        <Typography variant="h1" gutterBottom data-testid="settings-title">
          <Box
            sx={ { width: '100%',
              fontWeight: 'bold',
              fontSize: 48,
              textAlign: 'center' } }
          >
            Settings
          </Box>
        </Typography>
        <Paper
          elevation={ 10 }
          sx={ { my: 8, mx: 'auto', width: 0.6, py: 1, px: 4 } }
        >
          {this.renderForm()}
        </Paper>
      </Container>
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
