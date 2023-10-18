import React from "react";
import Image from "next/image";
import buttonBlue from "../../assets/icons/buttonBlue.gif";
import buttonRed from "../../assets/icons/buttonRed.gif";
import buttonGreen from "../../assets/icons/buttonGreen.gif";
const PixelArtButton = ({ color, size }: { color: string; size: number }) => {
  return (
    <Image
      height={size}
      width={size}
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
    />
  );
};

export default PixelArtButton;
