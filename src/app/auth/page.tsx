"use client";
import React from "react";
import supabase from "../../service/supabase/client";

import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const resAuth = await supabase.auth.signInWithOtp({
        email,
      });
      console.log({ resAuth });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ border: "1px solid black" }}
        action=""
      >
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          name="email"
          placeholder="Email"
          style={{ border: "1px solid black" }}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Auth;
