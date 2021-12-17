
export const Email = ({ value, changeInput }) => {
  
  return (
    <div>
      <label>Email</label>
      <input type={'email'} name={'email'} value={value} onChange={changeInput} />
    </div>
  );
};