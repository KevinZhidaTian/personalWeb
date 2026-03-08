use std::fs::File;
use std::path::Path;
fn compress(
    input_path: &Path,
    output_path: &Path,
    quality: u8,
) -> Result<(), std::io::Error> {
    // Create decoder from input path
    let file_content = File::open(input_path)?;
    let file_name_extension = input_path.extension();

    Ok(())
}