import styled from "styled-components";

export const InputContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: var(--font-semibold);
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-family: var(--font-main);
  text-transform: capitalize;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: ${(props) =>
    props.type === "file"
      ? "10px"
      : props.$hasIcon
        ? "14px 14px 14px 45px"
        : "14px"};

  background-color: var(--color-card-bg);
  border: 1px solid var(--color-input-border);
  border-radius: var(--radius);
  color: var(--color-text);
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  font-family: var(--font-main);

  &::placeholder {
    color: var(--color-text);
    opacity: 0.4;
  }

  &:focus {
    outline: none;
    border-color: var(--color-highlight);
    box-shadow: 0 0 0 1px var(--color-highlight);
  }

  &::file-selector-button {
    background-color: var(--color-input-border);
    color: var(--color-text);
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;
    transition: background 0.2s;
  }

  &::file-selector-button:hover {
    background-color: var(--color-highlight);
    color: var(--color-bg);
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: var(--color-icon-light);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;

  svg {
    width: 20px;
    height: 20px;
  }
`;
