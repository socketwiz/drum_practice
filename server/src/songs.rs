
use database;
use rusqlite::{Error};

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Song {
    pub id: Option<i32>,
    pub artist: String,
    pub genre: String,
    pub path: String,
    pub title: String
}


pub fn get_songs() -> Result<Vec<Song>, Error> {
    match database::get_songs() {
        Ok(query) => Ok(query),
        Err(error) => Err(error.into())
    }
}

pub fn add_song(song: &Song) -> Result<usize, Error> {
    match database::add_song(&song) {
        Ok(added) => Ok(added),
        Err(error) => Err(error.into())
    }
}

