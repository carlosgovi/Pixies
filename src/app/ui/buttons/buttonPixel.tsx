import React from "react";
import styles from "./buttonPixel.module.css";
import Image from "next/image";
import buttonBlue from "../../assets/icons/buttonBlue.gif";
import buttonRed from "../../assets/icons/buttonRed.gif";
import buttonGreen from "../../assets/icons/buttonGreen.gif";
const PixelArtButton = ({ color }: { color: string }) => {
  return (
    <Image
      src={
        color == "azul"
          ? buttonBlue
          : color == "rojo"
          ? buttonRed
          : color == "verde"
          ? buttonGreen
          : buttonBlue
      }
      alt="buscar"
      height={40}
      width={70}
      className={styles.button}
    />
  );
};

export default PixelArtButton;
