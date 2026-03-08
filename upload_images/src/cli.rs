use clap::{Parser};
#[derive(Parser, Debug)]
#[command(author="Kevin Tian", version, about = "Cli Tool for uploading images to S3 and Dynamo DB", long_about = None)]
pub struct Args {
    #[arg(
        global = true,
        short,
        long,
        default_value = "default",
        help = "The AWS profile to use"
    )]
    pub profile: Option<String>,
    pub uri: String,
}
