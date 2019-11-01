use songs::Song;

#[derive(PartialEq)]
pub enum Mode {
    Execute,
    Initialize,
    List,
    Add
}

pub fn parse_args(args: &[String]) -> Result<(Mode, String, Option<Song>), String>
{
    let mode: Mode;
    let database_path: String;
    let song: Option<Song>;

    if args.len() < 2 {
        return Err(format!("
Usage:  {0} init [path to database]
        {0} list [path to database]
        {0} exec
        {0} add [path to database] [artist] [genre] path title", args[0]));
    }

    match args[1].as_str() {
        "init" | "initialize" => {mode = Mode::Initialize;}
        "exec" | "execute" => {return Ok((Mode::Execute, "".into(), None));}
        "list" => {mode = Mode::List;}
        "add" => {mode = Mode::Add}
        &_ => {return Err("First argument must be init(ialize), exec(ute), or list.".into());}
    };

    if args.len() < 3 {
        return Err("No database path given; can't perform database operations.".into());
    } else {
        database_path = args[2].clone();
    };

    if mode == Mode::Add {
        song = Some(Song::new(0, args[3].clone(), args[4].clone(), args[5].clone(), args[6].clone()));
    } else {
        song = None;
    }

    Ok((mode, database_path, song))
}
