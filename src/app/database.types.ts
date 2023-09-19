export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
          love_potions: number | null;
          star_potions: number | null;
          coins: number | null;
          cards: Json[] | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          love_potions?: number | null;
          star_potions?: number | null;
          coins?: number | null;
          cards?: Json[] | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          love_potions?: number;
          star_potions?: number;
          coins?: number;
          cards?: Json[];
        };
      };
      cards: {
        Row: {
          id: string;
          atk: number | null;
          def: number | null;
          stars: number | null;
          type: string | null;
          rarity: string | null;
          monster_pick: string | null;
        };
        Insert: {
          id?: string;
          atk?: number | null;
          def?: number | null;
          stars?: number | null;
          type?: string | null;
          rarity?: string | null;
          monster_pick: string | null;
        };
        Update: {
          id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
