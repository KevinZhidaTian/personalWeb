use actix_web::web::Json;
use actix_web::{Responder, get, web};
use serde::Serialize;

#[get("/getContacts")]
async fn get_contacts() -> impl Responder {
    #[derive(Serialize)]
    struct ContactInfo {
        email: String,
        phone: String,
        linkedIn: String,
        instagram: String,
    }

    let contact_info = ContactInfo {
        email: "kevintzd@outlook.com".to_string(),
        phone: "+ 44 07594739847".to_string(),
        linkedIn: "https://www.linkedin.com/in/kevin-tian-6257b8200/".to_string(),
        instagram: "https://www.instagram.com/kevin_tzd/".to_string(),
    };
    Json(contact_info)
}
#[get("/getAboutMe")]
async fn get_about_me() -> Result<impl Responder, actix_web::Error> {
    let about_me_str: &'static str = include_str!("../data/aboutMe.txt");
    Ok(about_me_str)
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(get_contacts).service(get_about_me);
}
