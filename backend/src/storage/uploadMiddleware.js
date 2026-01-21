import multer from "multer";

// We use memoryStorage because we are forwarding the buffer to a cloud provider (Supabase)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit files to 5MB
  },
});

// Export specific configurations as named exports
export const profileUploads = upload.fields([
  { name: "profile_photo_file", maxCount: 1 },
  { name: "cv_file", maxCount: 1 },
]);
