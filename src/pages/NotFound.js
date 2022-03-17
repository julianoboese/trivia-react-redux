import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import React, { Component } from 'react';
import triviaLogo from '../assets/images/trivia-logo.gif';

export class NotFound extends Component {
  render() {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        sx={ { bgcolor: '#FFB834', minWidth: '100vw', minHeight: '100vh' } }
      >
        <Container sx={ { bgcolor: 'black', minWidth: '100vw', maxHeight: '10vw' } }>
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
        </Container>
        <Stack direction="column" justifyContent="center" sx={ { flexGrow: 1 } }>
          <Paper
            elevation={ 10 }
            sx={ { mx: 'auto', width: 0.5, p: 10, textAlign: 'center' } }
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
