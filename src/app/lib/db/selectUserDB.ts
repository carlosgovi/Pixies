import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../../database.types";

const supabase = createClientComponentClient<Database>();

async function getDataProfilesByUserNameDB(username: string) {
  username = username?.trim().toLowerCase();
  console.log("usernameeeeee", username);

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
export { getDataProfilesByUserNameDB };
