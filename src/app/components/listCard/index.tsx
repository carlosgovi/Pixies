import React from "react";
import Card from "../card";
import styles from "./styles.module.css";

const ListCard = ({
  data,
}: {
  data: {
    atk: number;
    def: number;
    stars: number;
    type: string;
    rarity: string;
    monster: number;
    id: number;
  }[];
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <div className={styles.flex_container}>
      {data?.map((data) => (
        <Card onClick={() => setModalOpen(true)} key={data.id} data={data} />
      ))}
    </div>
  );
};

export default ListCard;
