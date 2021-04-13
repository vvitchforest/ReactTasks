import React from 'react';
import MediaTable from '../components/MediaTable';

const MyFiles =
  () => {
    return (
      <>
        <h1>MyFiles</h1>
        <MediaTable ownFiles={true}/>
      </>
    );
  };

export default MyFiles;
