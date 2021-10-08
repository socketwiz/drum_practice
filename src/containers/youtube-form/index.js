
import {checkStatus, fetchJSON} from '../../base';
import {connect} from 'react-redux';
import {getSongs} from '../../base';
import {withRouter} from 'react-router';
import forEach from 'lodash/forEach';
import YoutubeForm from '../../components/youtube-form';

function onUpload(event, dispatch) {
  event.preventDefault();

  const element = event.currentTarget;
  const payload = {
    artist: '',
    genre: '',
    path: '',
    title: ''
  };

  forEach(element.getElementsByTagName('input'), element => {
    payload.path = element.value;
  });

  fetch('/api-v1/song', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  })
    .then(checkStatus)
    .then(fetchJSON)
    .then(data => getSongs(dispatch))
    .catch(error => {
      console.error(error);
    });
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        'onUpload': event => onUpload(event, dispatch)
    };
};

const YoutubeFormApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(YoutubeForm);

export default withRouter(YoutubeFormApp);
