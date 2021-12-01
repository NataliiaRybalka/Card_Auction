import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 } from 'uuid';

import { getChat, sendMessage } from "../../redux/actions/chats.actions";
import { socket } from "../../constants/socket";

export const Chat = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chatsReducer.chat);
  const [messageList, setMessageList] = useState([]);
  const room = localStorage.getItem('room');

  useEffect(() => {
    dispatch(getChat(localStorage.getItem('toUserId')));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0,document.body.scrollHeight);
  }, [chat]);

  const onChangeInputHandler = e => {
    setMessage(e.target.value);
  };

  const onSendMessage = async () => {
    if (message !== '') {
      const messageData = {
        room: room,
        from: localStorage.getItem('id'),
        to: localStorage.getItem('toUserId'),
        message,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      };

      dispatch(sendMessage({
        chatId: chat[0].chat_id,
        messageData
      }))
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);

      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  return (
    <div className={'main'}>
      <header>
        <h2>{localStorage.getItem('toUserLogin')}</h2>
      </header>

      <ul id={'chatList'}>
        {!!messageList.length && messageList.map(msgData => (
          <li key={msgData.message + v1()} className={(+msgData.from === +localStorage.getItem('id')) ? 'chatMessage fromMessage' : 'chatMessage toMessage'}>
            <span className={'chatMessageText'}>{msgData.message}</span>
            <br />
            <span className={'chatMessageTime'}>{msgData.time}</span>
          </li>
        ))}
      </ul>

      <footer>
        <div className="form chatForm">
          <input id="chatInput" value={message} type={'text'} name={'message'} onChange={onChangeInputHandler} onKeyPress={e => {e.key === 'Enter' && onSendMessage()}} />
          <button onClick={onSendMessage}>&#187;&#187;&#187;</button>
        </div>
      </footer>
    </div>
  );
};