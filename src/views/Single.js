import {uploadsUrl} from '../utils/variables';
import React from 'react';
import PropTypes from 'prop-types';

const Single = ({location}) => {
  console.log('match', location);
  const file = location.state;

  return (
    <React.Fragment>
      <h1>{file.title}</h1>
      <img src={uploadsUrl + file.filename} alt={file.title}/>
    </React.Fragment>
  );
};

Single.propTypes = {
  location: PropTypes.object,
};
export default Single;
