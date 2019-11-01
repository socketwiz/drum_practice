
use rocket::response;
use rocket_contrib;
use serde_json;
use songs;
use songs::Song;
use std::path::Path;

#[get("/api-v1/songs")]
pub fn songs_all() -> response::content::Json<String> {
    let all_songs = match songs::get_songs() {
        Some(value) => value,
        None => std::vec::Vec::new(),
    };

    let all_songs_string = match serde_json::to_string(&all_songs) {
        Ok(value) => value,
        Err(error) => panic!("Error {}", error),
    };

    response::content::Json(all_songs_string)
}

#[post("/api-v1/song", format = "application/json", data = "<song>")]
pub fn song_add(song: rocket_contrib::json::Json<Song>) -> response::content::Json<String> {
    let added = match songs::add_song(&song.0) {
        Some(value) => serde_json::to_string(&value),
        None => serde_json::to_string(&false),
    };

    let added_string = match added {
        Ok(value) => value,
        Err(error) => panic!("Error {}", error),
    };

    response::content::Json(added_string)
}

#[catch(404)]
pub fn not_found() -> Option<response::NamedFile> {
    // format!("Sorry, '{}' is not a valid path.", req.uri())

    response::NamedFile::open(Path::new("build/").join("404.html")).ok()
}
