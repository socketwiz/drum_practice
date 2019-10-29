
use rocket::response::content::{Json};
use rocket_contrib;
use serde_json;
use songs;
use songs::Song;

#[get("/api-v1/songs")]
pub fn songs_all() -> Json<String> {
    let all_songs = match songs::get_songs() {
        Some(value) => value,
        None => std::vec::Vec::new()
    };

    let all_songs_string = match serde_json::to_string(&all_songs) {
        Ok(value) => value,
        Err(error) => panic!("Error {}", error)
    };

    Json(all_songs_string)
}

#[post("/api-v1/song", format="application/json", data="<song>")]
pub fn song_add(song: rocket_contrib::json::Json<Song>) -> Json<String> {
    let added = match songs::add_song(&song.0) {
        Some(value) => serde_json::to_string(&value),
        None => serde_json::to_string(&false)
    };

    let added_string = match added {
        Ok(value) => value,
        Err(error) => panic!("Error {}", error)
    };

    Json(added_string)
}

