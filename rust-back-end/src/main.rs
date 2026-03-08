use crate::database::connection::Database;
use actix_web::http::KeepAlive;
use actix_web::middleware::DefaultHeaders;
use actix_web::{App, HttpResponse, HttpServer, Responder, get, web};

mod api;
mod database;
mod utils;
#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Kevin's Personal Website Backend")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database = Database::new("myapp.db").unwrap();
    let state = web::Data::new(database);
    HttpServer::new(move || {
        App::new()
            .app_data(state.clone())
            .wrap(
                DefaultHeaders::new()
                    .add(("Access-Control-Allow-Origin", "*"))
                    .add(("Access-Control-Allow-Methods", "GET, POST, OPTIONS"))
                    .add(("Access-Control-Allow-Headers", "Content-Type")),
            )
            .configure(api::config)
    })
    .keep_alive(KeepAlive::Os)
    .bind(("localhost", 8080))?
    .run()
    .await
}
