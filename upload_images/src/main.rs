use crate::aws_utils::{upload_to_s3};
use crate::cli::Args;
use crate::compress::{CompressConfig, OutputFormat, compress};
use clap::Parser;
use std::path::{Path};

mod aws_utils;
mod cli;
mod compress;

fn derive_output_path(
    input_path: &Path,
    format: &OutputFormat,
    prefix: &str,
    extension: Option<&str>,
) -> String {
    let file_name = input_path
        .file_name()
        .unwrap()
        .to_str()
        .unwrap()
        .split('.')
        .next()
        .unwrap();
    let extension = if let Some(ext) = extension {
        ext
    } else {
        match format {
            OutputFormat::Jpeg => "jpg",
            OutputFormat::Png => "png",
            OutputFormat::WebP => "webp",
        }
    };
    Path::new(prefix)
        .join(format!("{}.{}", file_name, extension))
        .to_string_lossy()
        .into()
}
#[tokio::main]
async fn main() {
    let Args {
        profile,
        jpeg_quality,
        max_dimension,
        output_format,
    } = Args::parse();
    let profile = profile.unwrap_or("default".to_string());
    // let dynamodb_client = aws_sdk_dynamodb::Client::new(&aws_config);

    let img_path = Path::new("./src/test.jpg");
    if !img_path.exists() {
        eprintln!("Error: file not found — {}", img_path.display());
        std::process::exit(1);
    }

    let file_extension = img_path.extension().unwrap().to_str().unwrap();
    let preview_key = derive_output_path(img_path, &output_format.clone().unwrap(), "preview", None);
    let full_key = derive_output_path(img_path, &output_format.clone().unwrap(), "full", Some(file_extension));

    let mut compression_config = CompressConfig::default();
    if let Some(quality) = jpeg_quality {
        compression_config.jpeg_quality = quality.clamp(1, 100);
    }
    if let Some(dimension) = max_dimension {
        compression_config.max_dimension = Some(dimension);
    }
    if let Some(output_format) = output_format {
        compression_config.output_format = output_format;
    }
    println!("Compress config: {:?}", compression_config);
    let result = compress(img_path, &compression_config);

    let compression_result = match result {
        Ok(compression_result) => {
            compression_result.print();
            compression_result
        }
        Err(error) => {
            eprintln!("Compression failed: {error}");
            std::process::exit(1);
        }
    };

    //upload files to S3
    upload_to_s3(
        &profile,
        &compression_result,
        "portfolio-kevintzd",
        &full_key,
    )
    .await;
    upload_to_s3(
        &profile,
        &compression_result,
        "portfolio-kevintzd",
        &preview_key,
    )
    .await;

    //update dynamo
}
