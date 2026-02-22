pub mod cv;
pub mod experience;
pub mod gallery;

use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cv::config(cfg);
    gallery::config(cfg);
    experience::config(cfg);
}
