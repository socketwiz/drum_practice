
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
        Err(error) => {
            println!("[FATAL] {}", error);
            return 1;
        }
    };
    let mode: args::Mode = parsing_results;

    match mode {
        Mode::Initialize => {
            let res = database::initialize();

            if res.is_err() {
                println!("[FATAL] {:?}", res);

                return 2;
            }

            println!("Initialized SQLite Database.");
        }
        Mode::Execute => {
            rocket::ignite()
                .mount("/", StaticFiles::from(concat!(env!("CARGO_MANIFEST_DIR"), "/static")))
                .mount("/", routes![routes::songs_all, routes::song_add])
                .register(catchers![routes::not_found])
                .launch();
        }
        Mode::List => {
            let maybe_songs = database::get_songs();
            let songs_vec = match maybe_songs {
                Ok(q) => q,
                Err(e) => {
                    println!("[FATAL] {:?}", e);

                    return 3;
                }
            };

            for song in songs_vec {
                println!("song: {} - {} - {} - {}", song.artist, song.genre, song.path, song.title);
            }
        }
    };

    0 // return 0 to the OS if all went well
}
