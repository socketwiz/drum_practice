
#[derive(PartialEq)]
pub enum Mode {
    Execute,
    Initialize,
    List
}

pub fn parse_args(args: &[String]) -> Result<Mode, String> {
    if args.len() < 2 {
        return Err(format!("
Usage: {0} exec
       {0} init
       {0} list", args[0]));
    }

    match args[1].as_str() {
        "exec" | "execute" => {
            return Ok(Mode::Execute);
        }
        "init" | "initialize" => {
            return Ok(Mode::Initialize);
        }
        "list" => {
            return Ok(Mode::List);
        }
        &_ => {
            return Err("First argument must be init(ialize), exec(ute), or list.".into());
        }
    }
}
