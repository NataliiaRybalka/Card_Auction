import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 } from 'uuid';

import { getChat } from "../../redux/actions/chats.actions";
import { socket } from "../../constants/socket";

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chatsReducer.chat);
  const room = localStorage.getItem('room');

  useEffect(() => {
    dispatch(getChat(localStorage.getItem('toUserId')));
  }, [dispatch]);

  const onChangeInputHandler = e => {
    setMessage(e.target.value);
  };

  const onSendMessage = () => {
    if (message !== '') {
      const messageData = {
        room: room,
        from: localStorage.getItem('id'),
        to: localStorage.getItem('toUserId'),
        chatId: chat[0].chat_id,
        message,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      };

      socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off('receive_message', (data) => {
        setMessageList((list) => [...list, data]);
      });
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0,document.body.scrollHeight);
  }, [messageList, chat]);

  return (
    <div className={'main'}>
      <header>
        <h2>{localStorage.getItem('toUserLogin')}</h2>
      </header>

      <ul id={'chatList'}>
        {!!chat.length && chat.map(msgData => (
          <li key={msgData.message + v1()} className={(+msgData.from === +localStorage.getItem('id')) ? 'chatMessage fromMessage' : 'chatMessage toMessage'}>
            <span className={'chatMessageText'}>{msgData.message}</span>
            <br />
            <span className={'chatMessageTime'}>{msgData.time}</span>
          </li>
        ))}
        {!!messageList.length && messageList.map(msgData => (
          <li key={msgData.message + v1()} className={(+msgData.from === +localStorage.getItem('id')) ? 'chatMessage fromMessage' : 'chatMessage toMessage'}>
            <span className={'chatMessageText'}>{msgData.message}</span>
            <br />
            <span className={'chatMessageTime'}>{msgData.time}</span>
          </li>
        ))}
      </ul>

      <footer className="form chatForm">
        <input id="chatInput" value={message} type={'text'} name={'message'} onChange={onChangeInputHandler} onKeyPress={e => {e.key === 'Enter' && onSendMessage()}} />
        <button onClick={onSendMessage}>&#187;&#187;&#187;</button>
      </footer>
    </div>
  );
};