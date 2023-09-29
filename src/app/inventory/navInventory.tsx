"use client";
import ListCard from "../components/listCard";
import NavBar from "../components/navBar";
import Menu from "../components/menu";
import { Press_Start_2P } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import { getProfileDB } from "../lib/db/navInventaryDB";

interface Perfile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  love_potions: number | null;
  star_potions: number | null;
  coins: number | null;
  cards: [];
}
export default function NavInventory({ session }: { session: Session | null }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Perfile>({} as Perfile);

  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getProfileDB(user);

      if (data) {
        setProfile({
          username: data.username,
          full_name: data.full_name,
          avatar_url: data.avatar_url,
          love_potions: data.love_potions,
          star_potions: data.star_potions,
          coins: data.coins,
          cards: data.cards as any,
        });
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  return (
    <div style={{ backgroundColor: "#163135" }}>
      <Menu />
      <NavBar
        username={profile.username}
        avatar_url={profile.avatar_url}
        userId={user?.id as string}
        lovePotios={profile.love_potions}
        starPotions={profile.star_potions}
        coins={profile.coins}
      />
      <div className=" with-title is-centered">
        <ListCard
          data={profile.cards}
          implementModal={true}
          onSelectCard={() => {}}
        />
      </div>
      <button className="nes-btn is-primary">Test Card</button>
    </div>
  );
}
