import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../database.types";

const supabase = createClientComponentClient<Database>();

async function getImgMosterDB(path: string) {
  const { data, error } = await supabase.storage
    .from("monsters")

    .download(path);
  if (error) {
    throw error;
  }

  const url = URL.createObjectURL(data);
  return url;
}
export { getImgMosterDB };
