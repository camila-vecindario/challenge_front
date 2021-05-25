import './FilePicker.scss';
import { useState } from 'react';

const ImagePicker = ({ name = 'file', label = 'Sube una imagen', onChange }) => {
  const [image, setImage] = useState(null);

  const handleChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const result = e.target.result;
      setImage(result);
    };

    if (onChange) {
      onChange(file);
    }

    reader.readAsDataURL(file);
  };

  return (
    <div className='file-picker'>
      <input type='file' name={name} accept='image/*' id={name} onChange={handleChange} />
      <label htmlFor={name}>{image ? <img src={image} alt='av' /> : label}</label>
    </div>
  );
};

export default ImagePicker;
