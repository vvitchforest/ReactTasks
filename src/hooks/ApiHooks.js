/* eslint-disable max-len */
import {useState, useEffect} from 'react';
import {appIdentifier, baseUrl} from '../utils/variables';

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
      const response = await fetch(baseUrl + 'tags/' + appIdentifier);
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
      return response;
    } catch (e) {
      alert(e.message);
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

  const getUser = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'users/user', fetchOptions);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getUserById = async (token, id) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'users/' + id, fetchOptions);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {register, getUserAvailable, getUser, getUserById};
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

const useMedia = () => {
  const [loading, setLoading] = useState(false);
  const postMedia = async (formData, token) => {
    setLoading(true);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: formData,
    };
    try {
      const response = await doFetch(baseUrl + 'media', fetchOptions);
      if (response.message) {
      }
      return response;
    } catch (e) {
      throw new Error('upload failed');
    } finally {
      setLoading(false);
    }
  };
  return {postMedia, loading};
};

const useTag = () => {
  const postTag = async (token, id, tag = appIdentifier) => {
    const data = {
      file_id: id,
      tag: tag,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await doFetch(baseUrl + 'tags', fetchOptions);
      if (response.message) {
      }
      return response;
    } catch (e) {
      throw new Error('tagging failed');
    }
  };
  return {postTag};
};


export {useAllMedia, useUsers, useLogin, useMedia, useTag};
