const ProgressCard = ({ percent }) => {
  const cardStyle = {
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    width: '20rem',
    padding: '3rem 1rem 3rem 1rem',
    borderRadius: '10px',
  };

  return (
    <div>
      <div className='' style={cardStyle}>
        <div>
          <div
            className='meter'
            style={{
              width: `${percent}%`,
              backgroundColor: '#2F80ED',
              height: '.5rem',
              boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
              borderRadius: '10px',
            }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
