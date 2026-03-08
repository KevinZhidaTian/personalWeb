use clap::Parser;
use crate::aws_client::get_aws_client_config;
use crate::cli::Args;

mod cli;
mod aws_client;
mod compress;

#[tokio::main]
async fn main() {
    let args = Args::parse();
    let profile = args.profile.unwrap_or("default".to_string());
    let aws_config = get_aws_client_config(&profile).await;
    let s3_client = aws_sdk_s3::Client::new(&aws_config);
    let dynamodb_client = aws_sdk_dynamodb::Client::new(&aws_config);

    //upload files to S3
    let file_name = args.uri.split('/').last().unwrap().to_string();
    let response = s3_client.put_object().bucket("portfolio-kevintzd").key("asdas").send().await;
}
