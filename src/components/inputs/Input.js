import './Input.scss';
import { forwardRef } from 'react';

const Input = forwardRef(({ ...props }, ref) => {
  const { name, errors } = props;

  return (
    <>
      <input {...props} className='input' name={name} ref={ref} />
      <p className='input__error'>{errors?.[name]?.message}</p>
    </>
  );
});

export default Input;
