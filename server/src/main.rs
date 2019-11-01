
#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate rocket_contrib;
extern crate rusqlite;

#[macro_use]
extern crate serde_derive;
extern crate serde_json;

mod args;

mod database;
mod routes;
mod songs;

use args::Mode;
use rocket_contrib::serve::StaticFiles;

fn main() {
    let rc = run();

    std::process::exit(rc);
}

fn run() -> i32 {
    let given_arguments: Vec<_> = std::env::args().collect();
    let parsing_results = match args::parse_args(&given_arguments) {
        Ok(value) => value,
        Err(error) => {println!("[FATAL] {}", error); return 1;}
    };
    let mode: args::Mode = parsing_results.0;
    let database_path: String = parsing_results.1;
    let song_to_add: Option<songs::Song> = parsing_results.2;

    println!("Opening SQLite database at {:?}.", database_path);
    let mut db_connection = match database::get_database_connection(database_path) {
        Ok(value) => value,
        Err(error) => panic!("{}", error)
    };

    match mode {
        Mode::Initialize => {
            let res = database::initialize(&mut db_connection);
            if res.is_err() {
                println!("[FATAL] {:?}", res);
                return 1;
            }
            println!("Initialized SQLite Database.");
        }
        Mode::Execute => {
            rocket::ignite()
                .mount("/", StaticFiles::from("./build"))
                .mount("/", routes![routes::songs_all, routes::song_add])
                .register(catchers![routes::not_found])
                .launch();
        }
        Mode::List => {
            let maybe_songs = database::get_songs(&mut db_connection);
            let songs_vec = match maybe_songs {
                Ok(q) => q,
                Err(e) => {
                    println!("[FATAL] {:?}", e);
                    return 1;
                }
            };
            for song in songs_vec {
                println!("song: {} - {} - {} - {}", song.artist, song.genre, song.path, song.title);
            }
        }
        Mode::Add => {
            let song = match song_to_add {
                Some(value) => value,
                None => panic!("[FATAL] Asked to add a nonexistant song.")
            };
            match database::add_song(&mut db_connection, &song) {
                Ok(_) => (),
                Err(error) => println!("[FATAL] Failed to add song. {:?}", error)
            }
        }
    };

    0
}

#[no_mangle]
pub extern fn hello() -> &'static str {
    "hello, world!"
}
