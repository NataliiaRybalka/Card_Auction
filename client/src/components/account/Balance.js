import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBalance } from "../../redux/actions/user.actions";
import { TopUpAccount } from "./TopUpAccount";

export const Balance = () => {
  const dispatch = useDispatch();
  const balance = useSelector(state => state.userReducer.balance);
  const transactions = useSelector(state => state.userReducer.transactions);

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  return (
    <div className={'main'}>
      <header>
        <div>
          <h2>Balance</h2>
          <p>Your current balance - <span id={'balance'}>{balance}</span> CP.</p>
        </div>
        <TopUpAccount />
      </header>

      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>sum</th>
          </tr>
        </thead>

        <tbody>
          {!!transactions.length && transactions.map(transactions => (
            <tr key={transactions.id}>
              <td>{transactions.finalDate}</td>
              <td>{transactions.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};