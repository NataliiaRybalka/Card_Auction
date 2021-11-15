import './ButtonPagination.css';
import { LIMIT } from "../../constants/contants";

export const ButtonPagination = ({ totalItem, setFilter }) => {
  const pagesArray = [];
  for (let i = 0; i < (totalItem / LIMIT); i++) {
    pagesArray.push(i + 1);
  }

  const onSelectPageHandler = e => {
    setFilter(prev => ({
      ...prev,
      ...{offset: +e.target.textContent}
    }))
  };

  return (
    <div className={'pagePaginationBlock'}>
      {!!pagesArray.length && pagesArray.map(page => <button key={page} className={'pagePagination'} onClick={onSelectPageHandler}>{page}</button>)}
    </div>
  );
};