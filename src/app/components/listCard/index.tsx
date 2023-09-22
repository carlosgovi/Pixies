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
    monster_pick: string;
    id: number;
  }[];
}) => {
  return (
    <div className={styles.flex_container}>
      {data?.map((data) => (
        <Card key={data.id} data={data} />
      ))}
    </div>
  );
};

export default ListCard;
