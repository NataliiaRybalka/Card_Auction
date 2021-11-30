import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getChat, sendMessage } from "../../redux/actions/chats.actions";

export const Chat = () => {
  const [messageData, setMessageData] = useState({
    from: localStorage.getItem('id'),
    to: localStorage.getItem('toUserId'),
    message: ''
  });
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chatsReducer.chat);

  useEffect(() => {
    dispatch(getChat(localStorage.getItem('toUserId')));
  }, [dispatch]);

  const onChangeInputHandler = e => {
    setMessageData(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }));
  };

  const onSendMessage = () => {
    if (messageData.message.length) {
      dispatch(sendMessage({ chatId: chat[0].chat_id, messageData }));

      setMessageData({
        message: ''
      });
    }
  };

  return (
    <div className={'main'}>
      <header>
        <h2>{localStorage.getItem('toUserLogin')}</h2>
      </header>

      <ul>
        {!!chat.length && chat.map(msgData => (
          <li key={msgData.id}>{msgData.message}</li>
        ))}
      </ul>
      <div className="form chatForm">
        <input id="chatInput" value={messageData.message} type={'text'} name={'message'} onChange={onChangeInputHandler}  />
        <button onClick={onSendMessage}>send</button>
      </div>
    </div>
  );
};