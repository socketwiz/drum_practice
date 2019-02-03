use rusqlite::{Connection, Error};
use songs::Song;

// SQL to create the songs table in the database
const SQL_INIT_DATABASE: &'static str =
" CREATE TABLE songs (
    id integer PRIMARY KEY,
    artist TEXT,
    genre TEXT,
    path TEXT NOT NULL,
    title TEXT NOT NULL
)";


const SQL_INSERT_SONG: &'static str =
" INSERT INTO songs (artist, genre, path, title) VALUES (?1, ?2, ?3, ?4)";

const SQL_QUERY_ALL_SONGS: &'static str =
" SELECT * FROM songs ";

pub fn get_database_connection(location: String) -> Result<Connection, Error> {
    Connection::open(location)
}

pub fn initialize(connection: &mut Connection) -> Result<(), Error> {
    connection.execute(SQL_INIT_DATABASE, &[])?;
    Ok(())
}

pub fn add_song(connection: &mut Connection, song: &Song) -> Result<(), Error> {
    connection.execute(SQL_INSERT_SONG, &[&song.artist, &song.genre, &song.path, &song.title])?;
    Ok(())
}

pub fn get_songs(connection: &mut Connection) -> Result<Vec<Song>, Error> {
    let mut statement = connection.prepare(SQL_QUERY_ALL_SONGS)?;
    let maybe_songs_iter = statement.query_map(&[], |row| {
        Song::new(row.get::<_, String>(1), row.get::<_, String>(2), row.get::<_, String>(3), row.get::<_, String>(4))
    })?;

    let mut songs = Vec::new();
    for song in maybe_songs_iter {
        songs.push(song.unwrap());
    }

    return Ok(songs)
}

