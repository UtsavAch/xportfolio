const ButtonComponent = (props) => {
  return (
    <div>
      <button onClick={props.handleSubmit}>Send</button>
    </div>
  );
};

export default ButtonComponent;
