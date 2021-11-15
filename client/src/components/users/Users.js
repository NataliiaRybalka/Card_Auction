import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from '../../redux/actions/users.actions';
import { LOCALHOST, ADMIN, USER } from "../../constants/contants";
import { PUT } from "../../constants/httpMethods";
import { httpHelper } from "../../helpers/http.helper";

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const makeAdminHandler = async (user) => {
    const { request } = httpHelper();
    const newRole = user.role_id.title === ADMIN ? USER : ADMIN;
    return await request(`${LOCALHOST}users/admin/${user.id}`, localStorage.getItem('accessToken'), PUT, { newRole });
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
        {!!users.length && users.map(user => (
          <tr key={user.id}>
            <td>{user.login}</td>
            <td>{user.email}</td>
            <td>{user.rating}</td>
            <td> <button onClick={() => makeAdminHandler(user)}>change to {(!!user.role_id && user.role_id.title === ADMIN) ? USER : ADMIN}</button> </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};