import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  GridList,
  GridListTile,
  ListSubheader, useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 960,
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const MediaTable = ({ownFiles}) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia(ownFiles);
  console.log('Media Table', picArray);
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={320}
        className={classes.gridList}
        cols={matches ? 3 : 2}
      >
        <GridListTile key="Subheader" cols={3} style={{height: 'auto'}}>
          <ListSubheader component="div">Media feed</ListSubheader>
        </GridListTile>
        {picArray.map((item) => {
          return <GridListTile key={item.file_id} >
            <MediaRow file={item}/>;
          </GridListTile>;
        })
        }
      </GridList>
    </div>
  );
};

MediaTable.propTypes = {
  ownFiles: PropTypes.bool,
};

export default MediaTable;

