
import {checkStatus, fetchJSON} from '../../base';
import {connect} from 'react-redux';
import forEach from 'lodash/forEach';
import {getSongs} from '../../base';
import 'whatwg-fetch';
import {withRouter} from 'react-router';
import YoutubeForm from '../../components/youtube-form';

function onUpload(event, dispatch) {
    event.preventDefault();

    const element = event.currentTarget;

    let url = '';

    forEach(element.getElementsByTagName('input'), element => {
        url = element.value;
    });

    fetch('/api-v1/upload-youtube', {'method': 'POST', 'body': url})
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
