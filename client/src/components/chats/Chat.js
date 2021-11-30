import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getChat, sendMessage } from "../../redux/actions/chats.actions";
import { socket } from '../../constants/socket';

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

  // var messages = document.getElementById('messages');
  // var form = document.getElementById('form');
  // var input = document.getElementById('input');

  // form.addEventListener('submit', function(e) {
  //   e.preventDefault();
  //   if (input.value) {
      // socket.emit('chat message', input.value);
      // input.value = '';
  //   }
  // });

  // socket.on('chat list', function(msg) {
  //   var item = document.createElement('li');
  //   item.textContent = msg;
  //   messages.appendChild(item);
  //   window.scrollTo(0, document.body.scrollHeight);
  // });

  const onChangeInputHandler = e => {
    setMessageData(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }));
  };

  const onSendMessage = () => {
    if (messageData.message.length) {
      dispatch(sendMessage({ chatId: chat[0].chat_id, messageData }));
      socket.emit('chat message', messageData.message);
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

      <ul id="chatMessages"></ul>
      <div className="form chatForm">
        <input id="chatInput" value={messageData.message} type={'text'} name={'message'} onChange={onChangeInputHandler}  />
        <button onClick={onSendMessage}>send</button>
      </div>
    </div>
  );
};