use rusqlite::{Connection, Error, NO_PARAMS};
use songs::Song;

// SQL to create the songs table in the database
const SQL_INIT_DATABASE: &str =
" CREATE TABLE songs (
    id integer PRIMARY KEY,
    artist TEXT,
    genre TEXT,
    path TEXT NOT NULL,
    title TEXT NOT NULL
)";


const SQL_INSERT_SONG: &str =
" INSERT INTO songs (artist, genre, path, title) VALUES (?1, ?2, ?3, ?4)";

const SQL_QUERY_ALL_SONGS: &str =
" SELECT * FROM songs ";

pub fn get_database_connection(location: String) -> Result<Connection, Error> {
    Connection::open(location)
}

pub fn initialize(connection: &mut Connection) -> Result<(), Error> {
    connection.execute(SQL_INIT_DATABASE, NO_PARAMS)?;
    Ok(())
}

pub fn add_song(connection: &mut Connection, song: &Song) -> Result<(), Error> {
    connection.execute(SQL_INSERT_SONG, &[&song.artist, &song.genre, &song.path, &song.title])?;
    Ok(())
}

pub fn get_songs(connection: &mut Connection) -> Result<Vec<Song>, Error> {
    let mut statement = connection.prepare(SQL_QUERY_ALL_SONGS)?;
    let maybe_songs_iter = statement.query_map(NO_PARAMS, |row| Ok(Song {
        id: row.get(0)?,
        artist: row.get(1)?,
        genre: row.get(2)?,
        path: row.get(3)?,
        title: row.get(4)?
    }))?;

    let mut songs = Vec::new();
    for song_result in maybe_songs_iter {
        let song = match song_result {
            Ok(value) => value,
            Err(error) => panic!("Error {}", error)
        };

        songs.push(song);
    }

    Ok(songs)
}

