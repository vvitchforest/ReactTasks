import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Link as RouterLink} from 'react-router-dom';
import {ListItem} from '@material-ui/core';

const Profile = () => {
  const [user] = useContext(MediaContext);

  return (
    <>
      <h1>Profile</h1>
      {user &&
        <div>
          <p>{user.full_name}</p>
          <p>{user.email}</p>
          <p>{user.username}</p>
          <ListItem component={RouterLink} to="/myfiles">
           MyFiles
          </ListItem>
        </div>
      }
    </>
  );
}
;

export default Profile;
