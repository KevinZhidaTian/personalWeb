use std::path::PathBuf;
use clap::{Parser};
use crate::compress::OutputFormat;

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
    #[arg(
        short,
        long,
        help = "JPEG quality 1-100"
    )]
    pub jpeg_quality: Option<u8>,
    #[arg(
        short,
        long,
        help = "Max width/height in pixels"
    )]
    pub max_dimension: Option<u32>,
    #[arg(
        short,
        long,
        help = "Output format: jpeg, png, webp"
    )]
    pub output_format: Option<OutputFormat>,
}
