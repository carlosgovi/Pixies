import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../../database.types";

const supabase = createClientComponentClient<Database>();
async function getDataProfile(user: User | undefined) {
  const { data, error, status } = await supabase
    .from("profiles")
    .select(`full_name, username,  avatar_url`)
    .eq("id", user?.id as string)
    .single();

  if (error && status !== 406) {
    throw error;
  }
  return { data };
}
interface Perfile {
  user: User | undefined;
  fullname: string | null;
  username: string | null;
  avatar_url: string | null;
}
async function uploadDataProfile({
  user,
  fullname,
  username,
  avatar_url,
}: Perfile) {
  const { error } = await supabase.from("profiles").upsert({
    id: user?.id as string,
    full_name: fullname,
    username,
    avatar_url,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  alert("Avatar guardado!");
}
export { getDataProfile, uploadDataProfile };
