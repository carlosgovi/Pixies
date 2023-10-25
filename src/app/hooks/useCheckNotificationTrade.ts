import { useQuery } from "react-query";

export default function useCheckNotificationTrade(
  check: boolean,
  tradeId: string,
  userNumber: string
) {
  return useQuery(["checkTrade", tradeId], async () => {
    try {
      const res = fetch(
        `http://localhost:3000/exchange/trade-check?check=${check}&tradeid=${tradeId}&usernumber=${userNumber}`,
        {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await res;
    } catch (error) {
      console.log("error", error);
    }
    /*  const { data } = await getTraderds(userId as string);
    return data; */
  });
}
