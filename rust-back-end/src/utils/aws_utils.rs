use aws_config::meta::region::RegionProviderChain;
use aws_config::profile::ProfileFileCredentialsProvider;
use aws_config::{BehaviorVersion, SdkConfig};

pub async fn get_aws_config() -> SdkConfig {
    let region_provider = RegionProviderChain::default_provider().or_else("eu-west-2");

    let credentials_provider = ProfileFileCredentialsProvider::builder()
        .profile_name("default")
        .build();

    aws_config::defaults(BehaviorVersion::latest())
        .region(region_provider)
        .credentials_provider(credentials_provider)
        .load()
        .await
}
