import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import './Chats.css';
import { LIMIT } from "../../constants/contants";
import { CHATS } from "../../constants/url.enum";
import { getChats } from "../../redux/actions/chats.actions";
import { ButtonPagination } from "../auxiliary/ButtonPagination";
import { NewChat } from "./NewChat";

export const Chats = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState({
    url: CHATS,
    limit: LIMIT,
    offset: 1
  });
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chatsReducer.chats);
  const totalItem = useSelector(state => state.chatsReducer.totalItem);

  useEffect(() => {
    dispatch(getChats(filter));
  }, [dispatch, filter]);

  const onSelectChatHandler = chat => {
    const toUserId = (+localStorage.getItem('id') === chat.from.id) ? chat.to.id : chat.from.id;
    localStorage.setItem('toUserId', toUserId);
  };

  return (
    <div className={'main'}>
      <header>
        <h2>Chats</h2>
        <button id={'createCardBtn'} onClick={() => setIsModalVisible(true)}>chat</button>
      </header>

      <ul className={'chatList'}>
        {!!chats.length && chats.map(chat => (
          <li key={chat.id} onClick={() => onSelectChatHandler(chat)}>
            <Link to='/chat' className={'navLinks'}>
              <div className={'chatName'}>{(+localStorage.getItem('id') === chat.from.id) ? chat.to.login : chat.from.login}</div>
              <div className={'chatMsg'}>{chat.message}</div>
            </Link>
          </li>
        ))}
      </ul>

      <ButtonPagination totalItem={totalItem} setFilter={setFilter} />

      <NewChat isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};