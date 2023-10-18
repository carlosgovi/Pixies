import { useQuery } from "react-query";
import { getProfileDB } from "../lib/db/navInventaryDB";

export default function useGetUserProfile(userId: string | undefined) {
  return useQuery(["profile", userId], async () => {
    const { data } = await getProfileDB(userId);
    return data;
  });
}
