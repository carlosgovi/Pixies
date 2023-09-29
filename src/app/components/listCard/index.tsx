import Card from "../card";
import styles from "./styles.module.css";

const ListCard = ({
  data,
  implementModal,
  onSelectCard,
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
  implementModal: boolean;
  onSelectCard: (id: {}) => void;
}) => {
  return (
    <div className={styles.flex_container}>
      {data?.map((data) => (
        <div onClick={() => onSelectCard(data)} key={data.id}>
          <Card key={data.id} data={data} implementModal={implementModal} />
        </div>
      ))}
    </div>
  );
};

export default ListCard;
