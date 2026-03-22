pub mod cv;
pub mod gallery;
pub mod experience;

use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cv::config(cfg);
    gallery::config(cfg);
    experience::config(cfg);
}
