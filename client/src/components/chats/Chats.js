import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import './Chats.css';
import { LIMIT } from "../../constants/contants";
import { CHATS } from "../../constants/url.enum";
import { getChats } from "../../redux/actions/chats.actions";
import { ButtonPagination } from "../auxiliary/ButtonPagination";
import { NewChat } from "./NewChat";
import { TO_USER_ID, ROOM, TO_USER_LOGIN, ID } from "../../constants/localStorage.enum";
import { socket } from '../../constants/socket';

export const Chats = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState({
    url: CHATS,
    limit: LIMIT,
    offset: 1
  });
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chatsReducer.chats);
  const totalItem = useSelector(state => state.chatsReducer.totalItem);

  useEffect(() => {
    dispatch(getChats(filter));
  }, [dispatch, filter]);

  socket.on('receive_notification_to_chatlist', (message) => {
    setNotifications(prev => ({
      ...prev,
      ...message
    }));
  });

  chats.map(chat => {
    const from = +localStorage.getItem(ID) === chat.from ? chat.to : chat.from;
    return notifications.map(notification => {
      if (notification.from === from) {
        chat.noReaded = true;
      }
    });
  });
console.log(chats);
  const onSelectChatHandler = chat => {
    localStorage.setItem(TO_USER_ID, (+localStorage.getItem(ID) === chat.from.id) ? chat.to.id : chat.from.id);
    localStorage.setItem(TO_USER_LOGIN, (+localStorage.getItem(ID) === chat.from.id) ? chat.to.login : chat.from.login);
    localStorage.setItem(ROOM, `${chat.from.id}-${chat.to.id}`);
  };

  return (
    <div className={'main'}>
      <header>
        <h2>Chats</h2>
        <button id={'createCardBtn'} onClick={() => setIsModalVisible(true)}>chat</button>
      </header>

      <ul className={'chatList'}>
        {!!chats.length && chats.map(chat => (
          <li key={chat.id} onClick={() => onSelectChatHandler(chat)} className={'notReaded'}>
            <Link to='/chat' className={'navLinks'}>
              <div className={'chatName'}>{(+localStorage.getItem(ID) === chat.from.id) ? chat.to.login : chat.from.login}</div>
              <div className={'chatMsg'}>{chat.message.message}</div>
            </Link>
          </li>
        ))}
      </ul>

      <ButtonPagination totalItem={totalItem} setFilter={setFilter} />

      <NewChat isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};