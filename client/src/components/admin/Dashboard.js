import { Chart } from "./Chart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalUsers } from '../../redux/actions/users.actions';
import { getTotalAuctions } from "../../redux/actions/auctions.actions";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const totalAuctions = useSelector(state => state.auctionsReducer.totalAuctions);
  const totalUsers = useSelector(state => state.usersReducer.totalUsers);

  useEffect(() => {
    dispatch(getTotalUsers());
    dispatch(getTotalAuctions());
  }, [dispatch]);

  return (
    <div className={'adminPage'}>
      <h2>Dashboard</h2>

      <Chart totalAuctions={totalAuctions} totalUsers={totalUsers} />
    </div>
  );
};