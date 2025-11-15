const InputComponent = (props) => {
  return (
    <div>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputComponent;
