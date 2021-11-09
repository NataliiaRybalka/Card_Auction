import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from '../../redux/actions/users.actions';

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={'adminPage'}>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>rating</th>
            <th>make admin</th>
          </tr>
        </thead>

        <tbody>
        {!!users.length && users[0].map(user => (
          <tr key={user.id}>
            <td>{user.login}</td>
            <td>{user.email}</td>
            <td>{user.rating}</td>
            <td> <button>admin</button> </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};