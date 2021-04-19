import {useMedia, useTag, useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';

const ProfileForm = ({user, setUser, setUpdate}) => {
  const {putUser, getUser} = useUsers();
  const {postMedia} = useMedia();
  const {postTag} = useTag();

  const validators = {
    confirm: ['isPasswordMatch'],
    email: ['required', 'isEmail'],
    full_name: ['matchRegexp:^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'],
  };

  const errorMessages = {
    // eslint-disable-next-line max-len
    confirm: ['Passwords do not match'],
    email: ['Required', 'Email is not valid'],
    full_name: ['Only letters please'],
  };

  const doUpdate = async () => {
    try {
      console.log('user muokkaus lomake lähtee');
      if (inputs.file) {
        const formData = new FormData();
        formData.append('title', inputs.username);
        formData.append('file', inputs.file);
        // eslint-disable-next-line max-len
        const fileResult = await postMedia(formData, localStorage.getItem('token'));
        const tagResult = await postTag(
            localStorage.getItem('token'),
            fileResult.file_id,
            'avatar_'+user.user_id,
        );
        console.log('tag result', fileResult, tagResult);
        if (fileResult) {
          alert(tagResult.message);
          setUpdate(true);
        }
      }
      delete inputs.confirm;
      delete inputs.file;
      const result = await putUser(inputs, localStorage.getItem('token'));
      console.log('doUpdate', result);
      if (result) {
        alert(result.message);
        const userData = await getUser(localStorage.getItem('token'));
        setUser(userData);
        // reset form (password and confirm)
        setInputs((inputs) => ({
          ...inputs,
          password: '',
          confirm: '',
        }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  // eslint-disable-next-line max-len
  const {inputs, handleInputChange, handleSubmit, handleFileChange, setInputs} = useUploadForm(doUpdate, user);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch',
        (value) => (value === inputs.password),
    );
  }, [inputs]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom>Update profile</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container>

            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="password"
                name="password"
                label="Password"
                value={inputs?.password}
                onChange={handleInputChange}
                validators={validators.password}
                errorMessages={errorMessages.password}
              />
            </Grid>

            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="password"
                name="confirm"
                label="Confirm password"
                value={inputs?.confirm}
                onChange={handleInputChange}
                validators={validators.confirm}
                errorMessages={errorMessages.confirm}
              />
            </Grid>

            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs?.email}
                validators={validators.email}
                errorMessages={errorMessages.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="text"
                name="full_name"
                label="Full name"
                onChange={handleInputChange}
                value={inputs?.full_name}
                validators={validators.full_name}
                errorMessages={errorMessages.full_name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="file"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth
                color="primary"
                type="submit"
                variant="contained">
                Update
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setUpdate: PropTypes.func,
};

export default ProfileForm;
