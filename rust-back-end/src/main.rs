use actix_web::{App, HttpResponse, HttpServer, Responder, get, post, web};
use serde_json::json;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[get("/getContacts")]
async fn get_contacts() -> impl Responder {
    let body = json!({
        "email": "kevintzd@outlook.com",
        "phone": "+ 44 07594739847",
        "linkedIn": "https: //www.linkedin.com/in/kevin-tian-6257b8200/",
        "instagram": "https: //www.instagram.com/kevin_tzd/",
    });
    HttpResponse::Ok().body(body.to_string())
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .service(get_contacts)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("localhost", 8080))?
    .run()
    .await
}
