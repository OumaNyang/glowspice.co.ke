"use server";

import { writeFile, mkdir, unlink, access } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function uploadImage(formData: FormData, type: "category" | "products" = "products") {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file selected for upload." };
    }

    // 1. Validate File Type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!validTypes.includes(file.type)) {
      return { error: `Invalid file format (${file.type}). Please upload a JPEG, PNG, or WebP image.` };
    }

    // 2. Validate File Size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return { error: `File is too large (${(file.size / (1024 * 1024)).toFixed(2)} MB). Maximum allowed size is 5MB.` };
    }

    // 3. Validate "Too Small" (e.g., less than 1KB - likely corrupted or wrong file)
    if (file.size < 1024) {
      return { error: "The selected image is too small or appears to be empty." };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with prefix based on type
    const prefix = type === "category" ? "cat_" : "prod_";
    const fileExtension = path.extname(file.name) || ".jpg";
    const fileName = `${prefix}${crypto.randomBytes(12).toString("hex")}${fileExtension}`;
    
    // Ensure both classification directory and main uploads directory exist
    const uploadDir = path.join(process.cwd(), "public", "images", "uploads", type);
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/images/uploads/${type}/${fileName}`;

    return { 
      success: true, 
      url: publicUrl,
      fileName: fileName
    };
  } catch (error: any) {
    console.error("UPLOAD_ERROR:", error);
    return { error: "Failed to upload image." };
  }
}

export async function deleteImage(imageUrl: string) {
  try {
    if (!imageUrl || !imageUrl.startsWith("/images/uploads/")) return;

    const filePath = path.join(process.cwd(), "public", imageUrl);
    
    try {
      await access(filePath);
      await unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
    } catch (e: any) {
      if (e.code !== 'ENOENT') {
        console.error(`Error deleting file ${filePath}:`, e);
      }
    }
  } catch (error) {
    console.error("DELETE_IMAGE_ERROR:", error);
  }
}
