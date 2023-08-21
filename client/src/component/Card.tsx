import Props from '../types/allTypes';

const Card = ({ children, onSubmit, onDragEnter }) => {
  return (
    <form
      encType='multipart/form-data'
      id='form-file-upload'
      className='card'
      onSubmit={onSubmit}
      onDragEnter={onDragEnter}>
      {children}
    </form>
  );
};

export default Card;
