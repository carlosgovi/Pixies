import React from "react";
import styles from "./PixelArtProgressBar.module.css";

const PixelArtProgressBar = ({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) => {
  return (
    <div className={styles.pixelArtProgressBar}>
      <div
        className={styles.progressFill}
        style={{ width: `${progress}%`, backgroundColor: color }}
      >
        <div className={styles.pixelShadows} />
      </div>
    </div>
  );
};

export default PixelArtProgressBar;
