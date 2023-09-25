import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../database.types";

const supabase = createClientComponentClient<Database>();
async function downloadStorageImg(path: string) {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")

      .download(path);
    if (error) {
      throw error;
    }

    const url: string = URL.createObjectURL(data);

    return url;
  } catch (error) {
    console.log("Error downloading image: ", error);
  }
}
async function uploadStorageImg(filePath: string, file: File) {
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }
}
export { downloadStorageImg, uploadStorageImg };
