import './Alert.css';

export const Alert = ({ msg }) => {

  return (
    <p className={'alert'}> {msg} </p>
  );
};