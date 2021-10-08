
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import './song.css';

class Song extends Component {
  removeSong(event) {
  }

  render() {
    const {data} = this.props;

    return (
      <div className="song-container">
        <div>
          <div>
            <span className="title">{data.title}</span>
          </div>
          <div>
            <span aria-hidden="true"
                  className="remove"
                  onClick={this.removeSong}></span>
          </div>
        </div>
      </div>
    );
  }
}

Song.propTypes = {
  'data': PropTypes.object.isRequired
};

export default Song;
