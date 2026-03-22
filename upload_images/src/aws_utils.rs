use aws_config::meta::region::RegionProviderChain;
use aws_config::profile::ProfileFileCredentialsProvider;
use aws_config::{BehaviorVersion, SdkConfig};
use aws_sdk_s3::primitives::ByteStream;
use crate::compress::{CompressionResult, OutputFormat};

pub async fn get_aws_client_config(profile: &str) -> SdkConfig{
    let region_provider = RegionProviderChain::default_provider().or_else("eu-west-2");
    let credential_provider = ProfileFileCredentialsProvider::builder().profile_name(profile).build();
    
    aws_config::defaults(BehaviorVersion::latest()).region(region_provider).credentials_provider(credential_provider).load().await
}

pub async fn upload_to_s3(profile: &str, compression_result: &CompressionResult, bucket: &str, key: &str) {
    let aws_config = get_aws_client_config(&profile).await;
    let s3_client = aws_sdk_s3::Client::new(&aws_config);

    let compressed_image = compression_result.compressed_image.clone();
    let output_format = compression_result.output_format.clone();
    let content_type = match output_format {
        OutputFormat::Jpeg => "image/jpeg",
        OutputFormat::Png => "image/png",
        OutputFormat::WebP => "image/webp",
    };

    s3_client.put_object().bucket(bucket).key(key).content_type(content_type).body(ByteStream::from(compressed_image)).send().await.unwrap();
}