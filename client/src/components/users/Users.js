import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from '../../redux/actions/users.actions';
import { LOCALHOST, ADMIN, USER, LIMIT } from "../../constants/contants";
import { USERS } from "../../constants/url.enum";
import { PUT } from "../../constants/httpMethods";
import { httpHelper } from "../../helpers/http.helper";
import { ButtonPagination } from "../pages/ButtonPagination";

export const Users = () => {
  const [filter, setFilter] = useState({
    url: USERS,
    limit: LIMIT,
    offset: 1
  });
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);
  const totalItem = useSelector(state => state.usersReducer.totalItem);

  useEffect(() => {
    dispatch(getUsers(filter));
  }, [dispatch, filter]);

  const makeAdminHandler = async (user) => {
    const { request } = httpHelper();
    const newRole = user.role_id.title === ADMIN ? USER : ADMIN;
    return await request(`${LOCALHOST}users/admin/${user.id}`, localStorage.getItem('accessToken'), PUT, { newRole });
  };

  return (
    <div className={'main'}>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>rating</th>
            <th className={localStorage.getItem('role') === USER ? 'noDisplay' : ''}>change role</th>
          </tr>
        </thead>

        <tbody>
        {!!users.length && users.map(user => (
          <tr key={user.id}>
            <td>{user.login}</td>
            <td>{user.email}</td>
            <td>{user.rating}</td>
            <td className={localStorage.getItem('role') === USER ? 'noDisplay' : ''}> <button onClick={() => makeAdminHandler(user)}>change to {(!!user.role_id && user.role_id.title === ADMIN) ? USER : ADMIN}</button> </td>
          </tr>
        ))}
        </tbody>
      </table>

      <ButtonPagination totalItem={totalItem} setFilter={setFilter} />
    </div>
  );
};