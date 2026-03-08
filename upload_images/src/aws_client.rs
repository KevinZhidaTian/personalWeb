use aws_config::meta::region::RegionProviderChain;
use aws_config::profile::ProfileFileCredentialsProvider;
use aws_config::{BehaviorVersion, SdkConfig};

pub async fn get_aws_client_config(profile: &str) -> SdkConfig{
    let region_provider = RegionProviderChain::default_provider().or_else("eu-west-2");
    let credential_provider = ProfileFileCredentialsProvider::builder().profile_name(profile).build();
    
    aws_config::defaults(BehaviorVersion::latest()).region(region_provider).credentials_provider(credential_provider).load().await
}