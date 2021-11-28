import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  return (
    <div className={'main'}>
      <header>
        <h2>Chats</h2>
      </header>

      <ul>
        
      </ul>
    </div>
  );
};