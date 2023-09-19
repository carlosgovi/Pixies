"use client";
import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { useState } from "react";
//menu hamburger
const Menu = () => {
  const [open, setOpen] = useState(false);
  function handleMenu() {
    setOpen(!open);
  }
  return (
    <div
      style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      className={styles.conteiner}
    >
      <div
        className={styles.flap}
        style={{ transform: open ? "rotate(180deg)" : "" }}
        onClick={handleMenu}
      ></div>

      <ul className={styles.menu}>
        <li className={styles.menu_item}>
          <Link href="/account"> Cuenta </Link>
        </li>
        <li className={styles.menu_item}>
          <Link href="/inventory">Inventario</Link>
        </li>
        <li className={styles.menu_item}>
          <Link href="/trader">Intercambio</Link>
        </li>

        <li className={styles.menu_item}>Combinar</li>
        <li className={styles.menu_item}>Tienda</li>
        <li className={styles.menu_item}>Mejorar</li>
        <li className={styles.menu_item}>Batalla</li>
      </ul>
    </div>
  );
};

export default Menu;
