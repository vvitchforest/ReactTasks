import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Link as RouterLink} from 'react-router-dom';
import {
  Card, CardContent,
  Container,
  Grid,
  Avatar, List,
  ListItem,
  ListItemAvatar,
  ListItemIcon, ListItemText,
  Typography, Button,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
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
      <Container maxWidth="md">
        <BackButton/>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
        >Profile
        </Typography>
        {user &&
            <Card>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant={'square'} src={avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.username} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary={user.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={user.full_name} />
                  </ListItem>
                  <ListItem component={RouterLink} to="/myfiles">
                    <Button color="primary">My files</Button>
                  </ListItem>
                  <ListItem button onClick={()=> {
                    setToggleForm(!toggleForm);
                  }}>
                    <ListItemIcon>
                      <CreateIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary=
                        {toggleForm ? 'Close update profile' : 'Update profile'}
                    />
                  </ListItem>
                </List>
              </CardContent>
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
