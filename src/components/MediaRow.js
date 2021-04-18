import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {GridListTileBar, IconButton, makeStyles} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {Link as RouterLink, withRouter} from 'react-router-dom';
import {useMedia} from '../hooks/ApiHooks';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const MediaRow = ({file, ownFiles, history}) => {
  const classes = useStyles();
  const {deleteMedia} = useMedia();
  let desc = {};

  try {
    desc = JSON.parse(file.description);
    console.log(desc);
  } catch (e) {
    desc = {description: file.description};
  }

  return (
    <>
      <img
        src={uploadsUrl + file.thumbnails?.w320}
        alt={file.title}
        style={{filter: `
            brightness(${desc.filters?.brightness}%)
            contrast(${desc.filters?.contrast}%)
            saturate(${desc.filters?.saturate}%)
            sepia(${desc.filters?.sepia}%)
            `,
        }}
      />
      <GridListTileBar
        title={file.title}
        subtitle={desc.description}
        actionIcon={
          <>

            <IconButton
              aria-label={`info about ${file.title}`}
              className={classes.icon}
              component={RouterLink}
              to={{
                pathname: '/single',
                state: file,
              }}
            >
              <PageviewIcon />
            </IconButton>
            {ownFiles &&
              <>
                <IconButton
                  aria-label={`modify file`}
                  className={classes.icon}
                  component={RouterLink}
                  to={{
                    pathname: '/modify',
                    state: file,
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label={`delete file`}
                  className={classes.icon}
                  onClick={() => {
                    try {
                      // eslint-disable-next-line max-len
                      const confirmDelete = confirm('Do you really want to delete?');
                      if (confirmDelete) {
                        // eslint-disable-next-line max-len
                        deleteMedia(file.file_id, localStorage.getItem('token'));
                      }
                      history.push('/profile');
                    } catch (e) {
                      console.log(e.message);
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          </>
        }
      />
    </>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
};


export default withRouter(MediaRow);
