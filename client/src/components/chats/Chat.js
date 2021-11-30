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

  useEffect(() => {
      window.scrollTo(0,document.body.scrollHeight);
  }, [chat]);

  const onChangeInputHandler = e => {
    setMessageData(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }));
  };

  const onSendMessage = e => {
    if(e.key === 'Enter') {
      console.log('enter press here! ')
    }
    if (messageData.message.length) {
      dispatch(sendMessage({ chatId: chat[0].chat_id, messageData }));

      setMessageData({
        message: ''
      });
    }
  };

  const onSendMessageByEnter = e => {
    if(e.key === 'Enter') {
      if (messageData.message.length) {
        dispatch(sendMessage({ chatId: chat[0].chat_id, messageData }));
  
        setMessageData({
          message: ''
        });
      }
    }
  };

  return (
    <div className={'main'}>
      <header>
        <h2>{localStorage.getItem('toUserLogin')}</h2>
      </header>

      <ul id={'chatList'}>
        {!!chat.length && chat.map(msgData => (
          <li key={msgData.id} className={(msgData.from === +localStorage.getItem('id')) ? 'chatMessage fromMessage' : 'chatMessage toMessage'}>
            <span>{msgData.message}</span>
          </li>
        ))}
      </ul>
      <div className="form chatForm">
        <input id="chatInput" value={messageData.message} type={'text'} name={'message'} onChange={onChangeInputHandler} onKeyPress={onSendMessageByEnter} />
        <button onClick={onSendMessage}>send</button>
      </div>
    </div>
  );
};