/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

// general function for fetching (options default value is empty object)
const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    // if API response contains error message (use Postman to get further details)
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    // eslint-disable-next-line max-len
    // if API response does not contain error message, but there is some other error
    throw new Error('doFetch failed');
  } else {
    // if all goes well
    return json;
  }
};

const useAllMedia = () => {
  const [picArray, setPicArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      const response = await fetch(baseUrl + 'media');
      const files = await response.json();

      // 2nd fetch:
      const media = await Promise.all(files.map(async (item) => {
        const resp = await fetch(baseUrl + 'media/' + item.file_id);
        return resp.json();
      }));
      setPicArray(media);
    };
    loadMedia();
  }, []);

  return picArray;
};

const useUsers = () => {
  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'users', fetchOptions);
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getUserAvailable = async (username) => {
    try {
      const response = await doFetch(baseUrl + 'users/username/' + username);
      return response.available;
    } catch (e) {
      console.log(e.message);
    }
  };
  return {register, getUserAvailable};
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'login', fetchOptions);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  };
  return {postLogin};
};

export {useAllMedia, useUsers, useLogin};
