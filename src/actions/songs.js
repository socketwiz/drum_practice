
export const UPDATE_SONGS = 'UPDATE_SONGS';

export function updateSongs(songs) {
    return {
        'type': UPDATE_SONGS,
        'songs': songs
    };
}
