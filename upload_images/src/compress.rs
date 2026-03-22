use std::fmt::{Debug};
use std::fs::{metadata};
use std::io::Cursor;
use std::path::Path;
use clap::ValueEnum;
use image::{imageops, GenericImageView, ImageBuffer, ImageError, ImageReader};
use image::imageops::Lanczos3;

#[derive(Debug, Clone, ValueEnum)]
pub enum OutputFormat {
    Jpeg,
    Png,
    WebP,
}

#[derive(Debug)]
pub struct CompressConfig {
    /// JPEG quality (1–100). Lower = smaller file.
    pub jpeg_quality: u8,
    /// Optional max width/height in pixels. Preserves aspect ratio.
    pub max_dimension: Option<u32>,
    /// Output format
    pub output_format: OutputFormat,
}

impl Default for CompressConfig {
    fn default() -> Self {
        Self{
            jpeg_quality: 100,
            max_dimension: None,
            output_format: OutputFormat::Jpeg,
        }
    }
}

pub struct CompressionResult {
    pub compressed_image: Vec<u8>,
    pub output_format: OutputFormat,
    original_size: u64,
    compressed_size: u64,
    original_dimensions: (u32, u32),
    new_dimensions: (u32, u32),
    saved_pct: f64,
}

impl CompressionResult{
    pub fn print(&self) {
        println!("\n── Results ──────────────────────────────────");
        println!(
            "  Dimensions : {}×{} → {}×{}",
            self.original_dimensions.0,
            self.original_dimensions.1,
            self.new_dimensions.0,
            self.new_dimensions.1,
        );
        println!(
            "  File size  : {:.1} KB → {:.1} KB  ({:.1}% smaller)",
            self.original_size as f64 / 1024.0,
            self.compressed_size as f64 / 1024.0,
            self.saved_pct,
        );
        println!("─────────────────────────────────────────────\n");
    }
}

pub fn compress(input_path: &Path, config: &CompressConfig) -> Result<CompressionResult, ImageError> {
    // read image
    println!("reading image content from {:?}", input_path.display());
    let original_img = ImageReader::open(input_path)?.with_guessed_format()?.decode()?;
    let original_size = metadata(input_path)?.len();
    let (original_width, original_height) = original_img.dimensions();
    println!("Original size:{}, dimensions: {}x{}", original_size, original_width, original_height);

    // resizing if needed
    let img = if let Some(max_dimension) = config.max_dimension {
        if original_width > max_dimension {
            println!("Maximum image dimension exceeded");
            println!("Resizing {}x{} -> max dimension {}px (Lanczos3)", original_width, original_height, max_dimension);
            let img = original_img.resize(max_dimension, max_dimension, Lanczos3);
            // unsharp_mask(sigma, threshold)
            // sigma     — blur radius, controls how wide the sharpening effect spreads (try 1.0–2.0)
            // threshold — minimum brightness diff to sharpen, avoids sharpening noise (try 5–15)
            imageops::unsharpen(&img, 0.75, 20)
        }else{
            ImageBuffer::from(original_img)
        }
    }else {
        ImageBuffer::from(original_img)
    };

    let (new_width, new_height) = img.dimensions();
    println!("New dimensions: {}x{}", new_width, new_height);
    let mut buffer = Cursor::new(Vec::new());
    // encode
    match config.output_format {
        OutputFormat::Jpeg => {
            use image::codecs::jpeg::JpegEncoder;
            let encoder = JpegEncoder::new_with_quality(&mut buffer, config.jpeg_quality);
            img.write_with_encoder(encoder)?;
        }

        OutputFormat::Png => {
            use image::codecs::png::PngEncoder;
            let encoder = PngEncoder::new(&mut buffer);
            img.write_with_encoder(encoder)?;
        }

        OutputFormat::WebP => {
            use image::codecs::webp::WebPEncoder;
            let encoder = WebPEncoder::new_lossless(&mut buffer);
            img.write_with_encoder(encoder)?;
        }
    };

    let compressed_size = img.len() as u64;
    let saved_pct = 100.0 - (compressed_size as f64 / original_size as f64 * 100.0);
    Ok(CompressionResult{
        compressed_image: buffer.into_inner(),
        output_format: config.output_format.clone(),
        original_size,
        compressed_size,
        original_dimensions: (original_width, original_height),
        new_dimensions: (new_width, new_height),
        saved_pct,
    })
}