import { create } from "zustand";
import { Database } from "../app/database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { getDataProfile } from "@/app/lib/db/accound-formDB";
interface cardBase {
  data: {
    avatar_url: string;
    full_name: string;
    username: string;
    id: number;
    cards: [];
  };
  getProfileStore: () => void;
}
const supabase = createClientComponentClient<Database>();

export const ProfileStore = create<cardBase>((set) => ({
  data: {
    avatar_url: "",
    full_name: "",
    username: "",
    id: 0,
    cards: [],
  },
  getProfileStore: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session === null) {
        return;
      }
      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `full_name, username,  avatar_url,cards,love_potions,star_potions,coins`
        )
        .eq("id", session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      set((state: any) => ({
        ...state,
        data,
      }));
    } catch (e) {
      console.log(e);
    }
  },
}));
ProfileStore.getState().getProfileStore();
