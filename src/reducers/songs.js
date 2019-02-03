
import {UPDATE_SONGS} from '../actions/songs';

const initialState = {
    'songs': []
};

function songsReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SONGS:
            return Object.assign({}, state, {
                'songs': action.songs
            });

        default:
            return state;
    }
}

export default songsReducer;
