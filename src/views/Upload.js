import useUploadForm from '../hooks/UploadHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {
  Button,
  CircularProgress, Container,
  Grid,
  Slider,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useSlider from '../hooks/SliderHooks';
import BackButton from '../components/BackButton';

const Upload = ({history}) => {
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    // eslint-disable-next-line max-len
    title: ['Required', 'Minimum 3 characters'],
    description: ['Minimum 5 characters'],
  };


  const doUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('title', inputs.title);
      // kuvaus + filtterit tallennetaan description kenttään
      const desc = {
        description: inputs.description,
        filters: sliderInputs,
      };
      formData.append('description', JSON.stringify(desc));
      formData.append('file', inputs.file);
      const result = await postMedia(formData, localStorage.getItem('token'));
      console.log('doUpload', result);
      // eslint-disable-next-line max-len
      const tagResult = await postTag(localStorage.getItem('token'), result.file_id);
      console.log('tag result', tagResult);
      history.push('/');
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit, handleFileChange, setInputs} =
      useUploadForm(doUpload, {
        title: '',
        description: '',
        file: null,
        dataUrl: '',
      });


  const [sliderInputs, handleSliderChange] = useSlider({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
  });


  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setInputs((inputs) => ({
        ...inputs,
        dataUrl: reader.result,
      }));
    });
    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => ({
          ...inputs,
          dataUrl: 'logo512.png',
        }));
      }
    }
  }, [inputs.file]);
  console.log(inputs, sliderInputs);


  return (
    <>
      <Container maxWidth="md">
        <BackButton />
        <Grid container>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h2"
              gutterBottom
            >
          Upload
            </Typography>
          </Grid>

          <Grid item>
            {!loading ?
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} >
              <TextValidator
                fullWidth
                name="title"
                label="Title"
                value={inputs.title}
                onChange={handleInputChange}
                validators={validators.title}
                errorMessages={errorMessages.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                fullWidth
                name="description"
                label="Description"
                value={inputs.description}
                onChange={handleInputChange}
                validators={validators.description}
                errorMessages={errorMessages.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="file"
                name="file"
                accept="image/*, audio/*, video/*"
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >Send</Button>
            </Grid>
            {inputs.dataUrl.length > 0 &&
              <Grid container
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={4}>
                  <img
                    src={inputs.dataUrl}
                    style={{
                      filter: `
                      brightness(${sliderInputs.brightness}%)
                      contrast(${sliderInputs.contrast}%)
                      saturate(${sliderInputs.saturate}%)
                      sepia(${sliderInputs.sepia}%)
                      `,
                      width: '100%',
                    }}
                  />
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography>Brightness</Typography>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      name="brightness"
                      value={sliderInputs?.brightness}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => value + '%'}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Contrast</Typography>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      name="contrast"
                      value={sliderInputs?.contrast}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => value + '%'}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Saturation</Typography>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      name="saturate"
                      value={sliderInputs?.saturate}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => value + '%'}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Sepia</Typography>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      name="sepia"
                      value={sliderInputs?.sepia}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => value + '%'}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            }
          </Grid>
        </ValidatorForm> :
        <CircularProgress/>
            }
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
;

Upload.propTypes =
{
  history: PropTypes.object,
}
;


export default Upload;
