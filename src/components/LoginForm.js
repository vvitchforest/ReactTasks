import {useContext} from 'react';
import useLoginForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {TextField, makeStyles, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const LoginForm = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const {postLogin} = useLogin();

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      console.log('user data', userData);
      localStorage.setItem('token', userData.token);
      setUser(userData.user);
      history.push('/');
    } catch (e) {
      console.log('do login', e.message);
    }
  };
  const classes = useStyles();
  const {inputs, handleInputChange, handleSubmit} = useLoginForm(doLogin, {
    username: '',
    password: '',
  });

  console.log('Login Form: ', inputs, user);
  return (
    <form
      className={classes.root}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.root}
      >Tallenna
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
