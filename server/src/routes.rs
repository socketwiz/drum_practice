
use rocket::response::content::{Json};
use rocket_contrib;
use serde_json;
use songs;
use songs::Song;

#[get("/api-v1/songs")]
pub fn songs_all() -> Json<String> {
    let all_songs = songs::get_songs().unwrap();
    Json(serde_json::to_string(&all_songs).unwrap())
}

#[post("/api-v1/song", format="application/json", data="<song>")]
pub fn song_add(song: rocket_contrib::Json<Song>) -> Json<String> {
    match songs::add_song(&song.0) {
        Some(_) => Json(serde_json::to_string(&true).unwrap()),
        None => Json(serde_json::to_string(&false).unwrap())
    }
}

