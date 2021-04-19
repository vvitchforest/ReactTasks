import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import {
  Button,
  CircularProgress, Container,
  Grid,
  Slider,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useSlider from '../hooks/SliderHooks';
import BackButton from '../components/BackButton';
import {uploadsUrl} from '../utils/variables';

const Modify = ({history, location}) => {
  const {putMedia, loading} = useMedia();
  const file = location.state;
  console.log('whaaaat', file);
  const desc = JSON.parse(file.description);

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
      const data = {
        title: inputs.title,
        description: JSON.stringify({
          description: inputs.description,
          filters: sliderInputs,
        }),
      };
      // eslint-disable-next-line max-len
      const result = await putMedia(data, file.file_id, localStorage.getItem('token'));
      console.log('modify', result);
      history.push('/myfiles');
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} =
      useUploadForm(doUpload, {
        title: file.title,
        description: desc.description,
      });

  const [sliderInputs, handleSliderChange] = useSlider(desc.filters);
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
          Modify
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
            <Grid container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={6}>
                <img
                  src={uploadsUrl + file.filename}
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
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={{marginBottom: '10%'}}
                  >Send</Button>
                </Grid>
              </Grid>
            </Grid>

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

Modify.propTypes =
{
  history: PropTypes.object,
  location: PropTypes.object,
}
;


export default Modify;
