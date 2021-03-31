import {useContext} from 'react';
import useLoginForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';


const LoginForm = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const {postLogin} = useLogin();

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      console.log('user data', userData);
      localStorage.setItem('token', userData.token);
      setUser(userData.user);
      history.push('/home');
    } catch (e) {
      console.log('do login', e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useLoginForm(doLogin);

  console.log('Login Form: ', inputs, user);
  return (
    <form onSubmit={handleSubmit}>
      <input name="username"
        onChange={handleInputChange}
        value={inputs.username} />
      <input name="password"
        type="password"
        onChange={handleInputChange}
        value={inputs.password}/>
      <button>Tallenna</button>
    </form>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
