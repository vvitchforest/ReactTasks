import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Link as RouterLink} from 'react-router-dom';
import {
  Card, CardActionArea,
  Container,
  Grid,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon, ListItemText,
  Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ProfileForm from '../components/ProfileForm';
import BackButton from '../components/BackButton';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';


const Profile = () => {
  const [user, setUser] = useContext(MediaContext);
  const [avatar, setAvatar] = useState('logo512.png');
  const [update, setUpdate] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const {getTag} = useTag();

  useEffect(() => {
    (async () => {
      try {
        const result = await getTag('avatar_' + user.user_id);
        if (result.length > 0) {
          const image = result.pop().filename;
          setAvatar(uploadsUrl + image);
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [user, update]);

  console.log(avatar);


  return (
    <>
      <Container>
        <BackButton/>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
        >Profile
        </Typography>
        {user &&
            <Card>
              <CardActionArea>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant={'square'} src={avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user.username} />
                </ListItem>
                <p>{user.username}</p>
                <p>{user.full_name}</p>
                <p>{user.email}</p>

                <ListItem component={RouterLink} to="/myfiles">
           MyFiles
                </ListItem>
                <ListItem button onClick={()=> {
                  setToggleForm(!toggleForm);
                }}>
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary=
                      {toggleForm ? 'Close update profile' : 'Update profile' }
                  />
                </ListItem>

              </CardActionArea>
            </Card>
        }
        {toggleForm &&
        <Grid>
          <ProfileForm user={user} setUser={setUser} setUpdate={setUpdate}/>
        </Grid>
        }
      </Container>
    </>
  );
}
;


export default Profile;
