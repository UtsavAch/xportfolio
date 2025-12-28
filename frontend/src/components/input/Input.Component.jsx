import {
  InputContainer,
  Label,
  InputWrapper,
  StyledInput,
  IconWrapper,
} from "./Input.Style";

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  id,
  icon,
  required = false,
}) => {
  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          $hasIcon={!!icon}
        />
      </InputWrapper>
    </InputContainer>
  );
};

export default Input;
