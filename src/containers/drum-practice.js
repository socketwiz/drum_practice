
import {checkStatus, fetchJSON} from '../base';
import {connect} from 'react-redux';
import {getSongs} from '../base';
import {withRouter} from 'react-router';
import DrumPractice from '../components/drum-practice';

function upload(payload, dispatch) {
  fetch('/api-v1/upload', {'method': 'POST', 'body': payload})
    .then(checkStatus)
    .then(fetchJSON)
    .then(() => getSongs(dispatch))
    .catch(error => {
      console.error(error);
    });
}

/**
 * Fired when an element is being dragged over a valid drop target
 *
 * @param {Object} event - React event object
 */
function onDragOver(event) {
  event.preventDefault();
}

/**
 * Fired when an element is dropped on a valid drop target
 *
 * @param {Object} event - React event object
 */
function onDrop(event, dispatch) {
  event.preventDefault();

  // If dropped items aren't files, reject them
  const dataTransfer = event.dataTransfer;

  if (dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < dataTransfer.items.length; i++) {
      if (dataTransfer.items[i].kind === 'file') {
        const file = dataTransfer.items[i].getAsFile();
        const data = new FormData();

        data.append('file', file);

        upload(data, dispatch);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < dataTransfer.files.length; i++) {
      const file = dataTransfer.files[i].getAsFile();
      const data = new FormData();

      data.append('file', file);

      upload(data, dispatch);
    }
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    'onDragOver': onDragOver,
    'onDrop': (event) => onDrop(event, dispatch)
  };
};

const DrumPracticeApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrumPractice);

export default withRouter(DrumPracticeApp);
