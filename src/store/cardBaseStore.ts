/*  import { create } from "zustand";
import { Database } from "../app/database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
interface cardBase {
  data: {
    atk: number;
    def: number;
    stars: number;
    type: string;
    rarity: string;
    monster: number;
    id: number;
  }[];
  getCardsBase: () => void;
}
const supabase = createClientComponentClient<Database>();

export const cardBaseStore = create<cardBase>((set) => ({
  data: [],
  getCardsBase: async () => {
    try {
      const { data, error, status } = await supabase.from("cards").select("*");
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
cardBaseStore.getState().getCardsBase();
  */
