import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../../database.types";

const supabase = createClientComponentClient<Database>();

async function getProfileDB(user: User | undefined) {
  let { data, error, status } = await supabase
    .from("profiles")
    .select(
      `full_name, username,love_potions,star_potions,coins,avatar_url,cards`
    )
    .eq("id", user?.id as string)
    .single();

  if (error && status !== 406) {
    throw error;
  }
  return { data };
}

export { getProfileDB };