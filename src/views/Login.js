import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, Container} from '@material-ui/core';
import {useState} from 'react';

const Login = () => {
  const [toggle, setToggle] = useState(true);

  const showHide = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Container maxWidth="md">
        { toggle ? <LoginForm/> : <RegisterForm setToggle={setToggle}/> }
        <Button onClick={showHide}>{toggle ? 'or register' : 'or login'}
        </Button>
      </Container>
    </>
  );
};


export default Login;
