
use database;

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Song {
    pub artist: String,
    pub genre: String,
    pub path: String,
    pub title: String
}


impl Song {
    pub fn new(artist: String, genre: String, path: String, title: String) -> Song {
        Song {
            artist,
            genre,
            path,
            title
        }
    }
}

pub fn get_songs() -> Option<Vec<Song>> {
    println!("get_songs");
    let mut connection = match database::get_database_connection("dev.db".to_string()) {
        Ok(value) => value,
        Err(error) => panic!("{}", error)
    };

    match database::get_songs(&mut connection) {
        Ok(q) => Some(q),
        Err(_) => None
    }
}

pub fn add_song(song: &Song) -> Option<()> {
    let mut connection = match database::get_database_connection("dev.db".to_string()) {
        Ok(value) => value,
        Err(error) => panic!("{}", error)
    };

    match database::add_song(&mut connection, &song) {
        Ok(_) => Some(()),
        Err(_) => None
    }
}

