import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getChat } from "../../redux/actions/chats.actions";

export const Chat = () => {
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chatsReducer.chat);

  useEffect(() => {
    dispatch(getChat(localStorage.getItem('toUserId')));
  }, [dispatch]);

  return (
    <div className={'main'}>
      <header>
        <h2>Chat</h2>
      </header>
    </div>
  );
};