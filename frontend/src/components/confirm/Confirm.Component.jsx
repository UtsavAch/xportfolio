import React from "react";
import {
  ConfirmBackdrop,
  ConfirmModal,
  ConfirmMessage,
  ButtonGroup,
  ActionButton,
} from "./Confirm.Style";

const Confirm = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary", // 'primary' | 'danger'
}) => {
  if (!isOpen) return null;

  return (
    <ConfirmBackdrop onClick={onCancel}>
      <ConfirmModal onClick={(e) => e.stopPropagation()}>
        <ConfirmMessage>{message}</ConfirmMessage>
        <ButtonGroup>
          <ActionButton onClick={onCancel}>{cancelText}</ActionButton>
          <ActionButton $variant={variant} onClick={onConfirm}>
            {confirmText}
          </ActionButton>
        </ButtonGroup>
      </ConfirmModal>
    </ConfirmBackdrop>
  );
};

export default Confirm;
