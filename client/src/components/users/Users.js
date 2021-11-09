import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from '../../redux/actions/users.actions';
import { LOCALHOST, ADMIN, USER } from "../../constants/contants";
import { PUT } from "../../constants/httpMethods";
import { httpHelper } from "../../helpers/http.helper";

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);
  const roles = useSelector(state => state.usersReducer.roles);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const makeAdminHandler = async (userId) => {
    const { request } = httpHelper();
    return await request(`${LOCALHOST}users/admin/${userId}`, localStorage.getItem('accessToken'), PUT, {role: ADMIN});
  };

  return (
    <div className={'adminPage'}>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>rating</th>
            <th>change role</th>
          </tr>
        </thead>

        <tbody>
        {!!users.length && users[0].map(user => (
          <tr key={user.id}>
            <td>{user.login}</td>
            <td>{user.email}</td>
            <td>{user.rating}</td>
            <td> <button onClick={() => makeAdminHandler(user.id)}>change to {ADMIN}</button> </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};