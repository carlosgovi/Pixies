"use client";
import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";
import style from "./auth.module.css";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <div className={style.form_container}>
      <div className={style.form_container_global}>
        <div className={style.form_title}></div>
        <Auth
          supabaseClient={supabase}
          localization={{
            variables: {
              magic_link: {
                email_input_placeholder: "ingrese su Email",
                email_input_label: "Registro",
                button_label: "Registrarse",
                confirmation_text: "Enlace de confirmación enviado",
              },
            },
          }}
          view="magic_link"
          appearance={{
            extend: false,

            className: {
              container: style.container,
              button: style.button,
              input: style.input,
              label: style.label,
              loader: style.loader,
              message: style.message,
            },
          }}
          showLinks={false}
          providers={[]}
          redirectTo="http://localhost:3000/auth/callback"
        />
      </div>
    </div>
  );
}
