import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Chats.css';
import { LIMIT } from "../../constants/contants";
import { CHATS } from "../../constants/url.enum";
import { getChats } from "../../redux/actions/chats.actions";

export const Chats = () => {
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

  const onOpenChatHandler = () => {};

  return (
    <div className={'main'}>
      <header>
        <h2>Chats</h2>
      </header>

      <ul className={'chatList'}>
        {!!chats.length && chats.map(chat => (
          <li key={chat.id} onClick={onOpenChatHandler}>
            <div className={'chatName'}>{(+localStorage.getItem('id') === chat.from.id) ? chat.to.login : chat.from.login}</div>
            <div>{chat.message}</div>
          </li>
        ))}
      </ul>

    </div>
  );
};