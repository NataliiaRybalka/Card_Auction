
export const Password = ({ value, changeInput }) => {
  
  return (
    <div>
      <label>Password</label>
      <input type={'password'} name={'password'} value={value} onChange={changeInput} />
    </div>
  );
};