// import {
//   InputContainer,
//   Label,
//   InputWrapper,
//   StyledInput,
//   IconWrapper,
// } from "./Input.Style";

// const Input = ({
//   label,
//   value,
//   onChange,
//   type = "text",
//   placeholder,
//   id,
//   icon,
//   required = false,
// }) => {
//   return (
//     <InputContainer>
//       {label && <Label htmlFor={id}>{label}</Label>}
//       <InputWrapper>
//         {icon && <IconWrapper>{icon}</IconWrapper>}
//         <StyledInput
//           id={id}
//           type={type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           required={required}
//           $hasIcon={!!icon}
//         />
//       </InputWrapper>
//     </InputContainer>
//   );
// };

// export default Input;

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
  ...props // Capture extra props like 'accept' or 'multiple'
}) => {
  // File inputs must be uncontrolled in React (no 'value' prop)
  const isFile = type === "file";

  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          id={id}
          type={type}
          // [FIX] If it's a file, we pass undefined so the browser handles it.
          // Otherwise, we pass the controlled value.
          value={isFile ? undefined : value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          $hasIcon={!!icon}
          {...props}
        />
      </InputWrapper>
    </InputContainer>
  );
};

export default Input;
