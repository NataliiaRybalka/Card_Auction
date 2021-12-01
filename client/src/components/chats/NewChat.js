import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getUsersWithoutPagination } from '../../redux/actions/users.actions';
import { TO_USER_ID, ROOM, TO_USER_LOGIN, ID } from "../../constants/localStorage.enum";

export const NewChat = (props) => {
  const { isModalVisible, setIsModalVisible } = props;
  const dispatch = useDispatch();
  let users = useSelector(state => state.usersReducer.users);
  users = users.filter(user => user.id !== +localStorage.getItem(ID));

  useEffect(() => {
    dispatch(getUsersWithoutPagination());
  }, [dispatch]);

  const onSelectChatHandler = user => {
    localStorage.setItem(TO_USER_ID, user.id);
    localStorage.setItem(TO_USER_LOGIN, user.login);
    localStorage.setItem(ROOM, `${localStorage.getItem(ID)}-${user.id}`);

    setIsModalVisible(false);
  };

  return (
    <div className={isModalVisible ? 'modal active' : 'modal'} onClick={() => setIsModalVisible(false)}>
      <div className={'modalContent modalContentChat'} onClick={e => e.stopPropagation()}>
        <ul className={'usersListForChat'}>
          {!!users.length && users.map(user => (
            <li key={user.id} onClick={() => onSelectChatHandler(user)}>
              <Link to='/chat' className={'navLinks'}>{user.login}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};