"use client";
import { Database, Json } from "../database.types";
import ListCard from "../components/listCard";
import NavBar from "../components/navBar";
import Menu from "../components/menu";
import { Press_Start_2P } from "next/font/google";
import { useCallback, useEffect, useState } from "react";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

const press_Start_2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const geMosterDB = [
  {
    atk: 80,
    def: 60,
    stars: 2,
    type: "fire",
    rarity: "rare",
    monster: 1,
    id: 1,
  },
  {
    atk: 40,
    def: 20,
    stars: 5,
    type: "weather",
    rarity: "ultra_rare",
    monster: 3,
    id: 2,
  },
  {
    atk: 20,
    def: 90,
    stars: 3,
    type: "plant",
    rarity: "comun",
    monster: 2,
    id: 3,
  },
  {
    atk: 40,
    def: 20,
    stars: 5,
    type: "weather",
    rarity: "ultra_rare",
    monster: 3,
    id: 4,
  },
  {
    atk: 20,
    def: 90,
    stars: 3,
    type: "plant",
    rarity: "comun",
    monster: 2,
    id: 5,
  },
];
export default function NavInventory({ session }: { session: Session | null }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [lovePotios, setLovePotions] = useState<number | null>(0);
  const [starPotions, setStarPotions] = useState<number | null>(0);
  const [coins, setCoins] = useState<number | null>(0);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [cards, setCards] = useState<[]>([]);
  const supabase = createClientComponentClient<Database>();
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

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

      if (data) {
        setUsername(data.username);
        setLovePotions(data.love_potions);
        setStarPotions(data.star_potions);
        setCoins(data.coins);
        setAvatarUrl(data.avatar_url);
        setCards(data.cards as any);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [supabase, user?.id]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  return (
    <div
      className={press_Start_2P.className}
      style={{ backgroundColor: "#163135" }}
    >
      <Menu />
      <NavBar
        username={username}
        avatar_url={avatar_url}
        userId={user?.id as string}
        lovePotios={lovePotios}
        starPotions={starPotions}
        coins={coins}
      />
      <div className=" with-title is-centered">
        <ListCard data={cards} />
      </div>
      <button className="nes-btn is-primary">Test Card</button>
    </div>
  );
}
