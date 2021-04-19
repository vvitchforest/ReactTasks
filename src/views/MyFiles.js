import React from 'react';
import MediaTable from '../components/MediaTable';
import {Container, Typography} from '@material-ui/core';

const MyFiles =
  () => {
    return (
      <>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            gutterBottom
          >My Files</Typography>
          <MediaTable ownFiles={true}/>
        </Container>
      </>
    );
  };

export default MyFiles;
