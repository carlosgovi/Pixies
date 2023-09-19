import { Press_Start_2P } from "next/font/google";
import AuthForm from "./auth-form";

const press_Start_2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={press_Start_2P.className}
      style={{ backgroundColor: "#163135" }}
    >
      <AuthForm />
    </div>
  );
}
