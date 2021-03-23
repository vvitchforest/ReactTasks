
import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';

const MediaTable = () => {
  const picArray = useAllMedia();
  return (
    <table>
      <tbody>
        {
          picArray.map((item, index) => {
            return <MediaRow key={index} file={item}/>;
          })
        }
      </tbody>
    </table>
  );
};


export default MediaTable;

