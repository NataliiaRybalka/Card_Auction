import { connect } from "react-redux";

const UserPage = ({ user }) => {

  return (
    <div>
      <h2>{user.login}</h2>
      <span>{user.email}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(UserPage);