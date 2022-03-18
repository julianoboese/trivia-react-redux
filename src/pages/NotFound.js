import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import triviaLogo from '../assets/images/trivia-logo.gif';

export class NotFound extends Component {
  render() {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        sx={ { bgcolor: '#FFB834', minWidth: '100vw', minHeight: '100vh' } }
      >
        <Container
          component="header"
          sx={ { bgcolor: 'black', minWidth: '100vw', maxHeight: '10vw' } }
        >
          <Box component={ Link } to="/">
            <Box
              component="img"
              sx={ {
                mt: 1.7,
                ml: 1,
                mb: 1,
                maxHeight: '75px',
              } }
              alt="Logo do trivia"
              src={ triviaLogo }
            />
          </Box>
        </Container>
        <Stack direction="column" justifyContent="center" sx={ { flexGrow: 1 } }>
          <Paper
            elevation={ 10 }
            sx={ { mb: 8, mx: 'auto', width: 0.5, p: 10, textAlign: 'center' } }
          >
            <Typography
              align="center"
              variant="h1"
              sx={ {
                fontWeight: 'bold',
              } }
            >
              404: Page not found
            </Typography>
          </Paper>
        </Stack>
      </Stack>
    );
  }
}

export default NotFound;
