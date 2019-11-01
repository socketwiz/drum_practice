
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import './youtube-form.css';

class YoutubeForm extends Component {

    render() {
        const {onUpload} = this.props;

        return (
            <form className="youtube-form" onSubmit={onUpload}>
                <div>
                    <input type="text"
                        id="youtubeUrl"
                        placeholder="Or paste a youtube url here and hit enter" />
                </div>
            </form>
        );
    }
}

YoutubeForm.propTypes = {
    'onUpload': PropTypes.func.isRequired
};

export default YoutubeForm;
