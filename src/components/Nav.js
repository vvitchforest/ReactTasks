
import {Link as RouterLink} from 'react-router-dom';
import {useEffect, useContext} from 'react';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, List, ListItem, ListItemText, Link}
  from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));


const Nav = ({history}) => {
  const classes = useStyles();
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


    <div >
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link button component={RouterLink} to="/" color="inherit">MyApp
            </Link>
          </Typography>
          <List style={{display: 'flex', marginRight: '5%'}}>
            <ListItem
              button
              component={RouterLink}
              to="/"
            >
              <ListItemText primary="Home"/>
            </ListItem>
            {user &&
            <>
              <ListItem
                button
                component={RouterLink}
                to="/profile"
              >
                <ListItemText primary="Profile"/>
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/upload"
              >
                <ListItemText primary="Upload"/>
              </ListItem>
            </>
            }
          </List>
          {user ?
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon/>}
              component={RouterLink}
              to="/logout"
            >
              Logout
            </Button> :
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon/>}
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
          }
        </Toolbar>
      </AppBar>
    </div>


  );
};

Nav.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Nav);
