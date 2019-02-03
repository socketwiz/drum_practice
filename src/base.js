
import {updateSongs} from './actions/songs';

/**
 * Check fetch status
 *
 * @param {Object} response - fetch response
 * @returns {Object} - fetch response
 */
export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);

        error.response = response;
        throw error;
    }
}

/**
 * Convert fetch response to JSON object
 *
 * @param {Object} response - fetch response
 * @returns {Object} - JSON object
 */
export function fetchJSON(response) {
    return response.json();
}

/**
 * Fetch the list of songs from the API
 *
 * @param {Object} dispatch - Redux dispatcher
 * @returns {Object} - fetch promise
 */
export function getSongs(dispatch) {
  return fetch('/api-v1/songs')
    .then(checkStatus)
    .then(fetchJSON)
    .then(data => {
      if (data.length) {
        dispatch(updateSongs(data));
      }
    })
    .catch(error => {
      console.error(error);
    });
}
