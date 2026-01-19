import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Upload profile picture (overwrite old one)
export const uploadProfilePicture = async (file) => {
  try {
    // Always save to the same path for each user
    const filePath = `profile-picture.jpg`;

    // Remove old file first (optional, since overwrite will replace it)
    await supabase.storage.from("xportfolio").remove([filePath]);

    // Upload new file (upsert: true means overwrite)
    const { error: uploadError } = await supabase.storage
      .from("xportfolio")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("xportfolio")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
};

// Upload CV
export const uploadCV = async (file) => {
  try {
    const filePath = `cv.pdf`; //

    await supabase.storage.from("xportfolio").remove([filePath]);

    const { error: uploadError } = await supabase.storage
      .from("xportfolio")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("xportfolio")
      .getPublicUrl(filePath);

    return `${urlData.publicUrl}?t=${new Date().getTime()}`;
  } catch (err) {
    console.error("CV Upload error:", err);
    throw err;
  }
};
