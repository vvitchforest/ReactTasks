import React from 'react';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {TextField, makeStyles, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const RegisterForm = () => {
  const {register, getUserAvailable} = useUsers();

  const doRegister = async () => {
    try {
      console.log('Lomake lähtee');
      const available = await getUserAvailable(inputs.username);
      console.log('available', available);
      if (available) {
        register(inputs);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const classes = useStyles();
  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);
  // console.log('Register Form: ', inputs);
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        name="username"
        onChange={handleInputChange}
        value={inputs.username}
        label="Username"
        variant="outlined"
      />
      <TextField
        name="password"
        type="password"
        onChange={handleInputChange}
        value={inputs.password}
        label="Password"
        variant="outlined"
      />
      <TextField
        name="email"
        type="email"
        onChange={handleInputChange}
        value={inputs.email}
        label="Email"
        variant="outlined"
      />
      <TextField
        name="full_name"
        onChange={handleInputChange}
        value={inputs.full_name}
        label="Full name"
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.root}
      >
        Tallenna
      </Button>
    </form>
  );
};

export default RegisterForm;
