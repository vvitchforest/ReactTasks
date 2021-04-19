import React from 'react';
import MediaTable from '../components/MediaTable';
import {Container, Typography} from '@material-ui/core';

const Home = () => {
  return (
    <>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          gutterBottom>
          Home
        </Typography>
        <MediaTable ownFiles={false}/>
      </Container>
    </>
  );
};

export default Home;
