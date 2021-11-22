import { Card } from "./Card";

export const FullCard = (props) => {
  const { card, isModalVisible, setIsModalVisible } = props;

  return (
    <div className={isModalVisible ? 'modal active' : 'modal'} onClick={() => setIsModalVisible(false)}>
      <div className={'modalContent'} onClick={e => e.stopPropagation()}>
        <Card card={card} />
      </div>
    </div>
  );
};