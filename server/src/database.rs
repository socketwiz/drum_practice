use std::fs;
use std::path::PathBuf;
use rusqlite::{params, Connection, Error};
use songs::Song;

fn get_db_path() -> String {
    let home = std::env::var("HOME").unwrap();

    return format!("{}/.local/share/drum-practice/drum-practice.sqlite3", home);
}

pub fn initialize() -> Result<usize, Error> {
    let db_file = get_db_path();
    let mut db_path = PathBuf::from(&db_file);

    // drop the file and get just the directory
    db_path.pop();

    fs::create_dir_all(db_path).unwrap();

    match Connection::open(db_file) {
        Ok(connection) => {
            connection.execute("CREATE TABLE songs (
                id integer PRIMARY KEY,
                artist TEXT,
                genre TEXT,
                path TEXT NOT NULL,
                title TEXT NOT NULL
            )", [])
        },
        Err(error) => Err(error.into())
    }
}

pub fn add_song(song: &Song) -> Result<usize, Error> {
    let db_file = get_db_path();

    match Connection::open(db_file) {
        Ok(connection) => {
            connection.execute(
                "INSERT INTO songs (artist, genre, path, title) VALUES (?1, ?2, ?3, ?4)",
                params![song.artist, song.genre, song.path, song.title]
            )
        },
        Err(error) => Err(error.into())
    }
}

pub fn get_songs() -> Result<Vec<Song>, Error> {
    let db_file = get_db_path();

    match Connection::open(db_file) {
        Ok(connection) => {
            match connection.prepare("SELECT * FROM songs") {
                Ok(mut statement) => {
                    match statement.query_map([], |row| {
                        Ok(Song {
                            id: row.get(0)?,
                            artist: row.get(1)?,
                            genre: row.get(2)?,
                            path: row.get(3)?,
                            title: row.get(4)?
                        })   
                    }) {
                        Ok(maybe_songs_iter) => {
                            let mut songs = Vec::new();

                            for song_result in maybe_songs_iter {
                                songs.push(song_result?);
                            }

                            Ok(songs)
                        },
                        Err(error) => Err(error.into())
                    }
                },
                Err(error) => Err(error.into())
            }
        },
        Err(error) => Err(error.into())
    }
}
