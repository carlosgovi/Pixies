import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../../database.types";

const supabase = createClientComponentClient<Database>();

async function getDataProfilesByUserNameDB(username: string) {
  username = username?.trim().toLowerCase();

  const { data, error, status } = await supabase.from("profiles").select("*");
  console.log("Los datos que trae la DB", data);

  if (error) {
    throw error;
  }
  const usersFilters = data?.filter((user) => {
    // Filtrar usuarios cuyos nombres de usuario contengan el nombre de usuario proporcionado
    return user.username?.toLowerCase().includes(username);
  });
  console.log("LOS USERS FILTRADOS", usersFilters);
  console.log("el status", status);

  return { data: usersFilters };
}
async function getTraderds(userId: string) {
  const { data, error } = await supabase
    .from("traders_cards")
    .select("*")
    .or(`user_1.eq.${userId},user_2.eq.${userId}`);

  if (error) {
    console.log(error);
  }
  return { data };
}
export { getDataProfilesByUserNameDB, getTraderds };
