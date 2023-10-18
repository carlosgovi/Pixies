import { useQuery } from "react-query";
import { getTraderds } from "../lib/db/selectUserDB";

export default function useGetNotificationTrader(userId: string | undefined) {
  return useQuery(["notificationTraders", userId], async () => {
    const { data } = await getTraderds(userId as string);
    return data;
  });
}
