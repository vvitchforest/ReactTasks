import {Link} from 'react-router-dom';
import {useEffect, useContext} from 'react';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const Nav = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const {getUser} = useUsers();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = await getUser(token);
        setUser(userData);
      } catch (e) {
        // send to login
        history.push('/');
      }
    };

    checkUser();
  }, []);

  return (
    <nav>

      <ul>
        {user &&
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
          </>
        }
        {user ?

        <li>
          <Link to="/logout">Logut</Link>
        </li> :
        <li>
          <Link to="/login">Login</Link>
        </li>

        }
      </ul>

    </nav>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Nav);
