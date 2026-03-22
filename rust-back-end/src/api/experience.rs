use crate::database::connection::Database;
use actix_web::{HttpResponse, Responder, get, web};
use serde::Serialize;

#[derive(Serialize)]
struct Experience {
    experience_id: i64,
    company: String,
    career_level: String,
    start_year: i64,
    start_month: String,
    is_present: bool,
    finish_year: Option<i64>,
    finish_month: Option<String>,
    project_id: i64,
    project_name: Option<String>,
    project_role: Option<String>,
    project_details: serde_json::Value,
}

#[get("/getExp")]
async fn get_exp(state: web::Data<Database>) -> impl Responder {
    let connection_arc = state.get_connection();
    let result = web::block(move || -> rusqlite::Result<Vec<Experience>> {
        let connection = connection_arc.lock().unwrap();
        let mut stmt = connection.prepare("SELECT * FROM experience_projects_view")?;
        let rows = stmt.query_map([], |row| {
            Ok(Experience {
                experience_id: row.get::<_, i64>("experience_id")?,
                company: row.get::<_, String>("company")?,
                career_level: row.get::<_, String>("career_level")?,
                start_year: row.get::<_, i64>("start_year")?,
                start_month: row.get::<_, String>("start_month")?,
                is_present: row.get::<_, bool>("is_present")?,
                finish_year: row.get::<_, Option<i64>>("finish_year")?,
                finish_month: row.get::<_, Option<String>>("finish_month")?,
                project_id: row.get::<_, i64>("project_id")?,
                project_name: row.get::<_, Option<String>>("project_name")?,
                project_role: row.get::<_, Option<String>>("project_role")?,
                project_details: serde_json::from_str(
                    &row.get::<_, String>("project_details")
                        .unwrap_or("[]".to_string()),
                )
                .unwrap_or(serde_json::Value::Array(vec![])),
            })
        })?;

        let mut exps = Vec::new();
        for r in rows {
            exps.push(r?);
        }
        Ok(exps)
    })
    .await;

    match result {
        Ok(Ok(exps)) => HttpResponse::Ok().json(exps),
        Ok(Err(e)) => HttpResponse::InternalServerError().body(format!("DB error: {}", e)),
        Err(e) => HttpResponse::InternalServerError().body(format!("Blocking error: {}", e)),
    }
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(get_exp);
}
