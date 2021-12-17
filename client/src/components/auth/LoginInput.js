
export const LoginInput = ({ value, changeInput }) => {
  
  return (
    <div>
      <label>Login</label>
      <input type={'text'} name={'login'} value={value} onChange={changeInput} />
    </div>
  );
};