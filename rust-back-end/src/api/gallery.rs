use crate::api::cv::get_contacts;
use crate::utils::aws_utils::get_aws_config;
use actix_web::web::Json;
use actix_web::{Responder, get, web};
use aws_sdk_s3::Client;
use serde::{Deserialize, Serialize};

#[get("/getPortfolio")]
async fn get_gallery() -> impl Responder {
    #[derive(Serialize, Deserialize, Debug)]
    struct ImgData {
        img: String,
        preview_img: String,
        title: Option<String>,
    }

    #[derive(Serialize, Deserialize, Debug)]
    struct ImgResponse {
        imgData: Vec<ImgData>,
    }

    let aws_config = get_aws_config().await;
    let s3_client = Client::new(&aws_config);

    let list_objects_outputs = s3_client
        .list_objects_v2()
        .bucket("portfolio-kevintzd")
        .prefix("full/")
        .send()
        .await
        .unwrap();
    let images = list_objects_outputs
        .contents
        .unwrap_or_default()
        .iter()
        .filter_map(|o| match o.key.as_deref() {
            Some(key) => {
                let base_url = "https://portfolio-kevintzd.s3.eu-west-2.amazonaws.com/";
                let file_name = &key.split('/').last().unwrap();
                // filter out "./" file
                if file_name.is_empty() {
                    return None;
                }
                let data = ImgData {
                    img: format!("{}{}", base_url, key),
                    preview_img: format!("{}{}{}", base_url, "preview/", file_name),
                    title: None,
                };
                Some(data)
            }
            None => None,
        })
        .collect::<Vec<ImgData>>();

    let img_response = ImgResponse { imgData: images };
    Json(img_response)
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(get_contacts).service(get_gallery);
}
