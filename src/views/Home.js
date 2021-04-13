import React from 'react';
import MediaTable from '../components/MediaTable';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <MediaTable ownFiles={false}/>
    </>
  );
};

export default Home;
