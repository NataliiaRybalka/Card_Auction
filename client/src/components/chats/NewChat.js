import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsersWithoutPagination } from '../../redux/actions/users.actions';

export const NewChat = (props) => {
  const { isModalVisible, setIsModalVisible } = props;
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);

  useEffect(() => {
    dispatch(getUsersWithoutPagination());
  }, [dispatch]);

  return (
    <div className={isModalVisible ? 'modal active' : 'modal'} onClick={() => setIsModalVisible(false)}>
      <div className={'modalContent'} onClick={e => e.stopPropagation()}>
        <ul className={'usersListForChat'}>
          {!!users.length && users.map(user => <li key={user.id}>{user.login}</li>)}
        </ul>
      </div>
    </div>
  );
};