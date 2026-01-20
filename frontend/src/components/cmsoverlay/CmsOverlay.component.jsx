import React, { useState, useEffect } from "react";
import Input from "../input/Input.Component";
import Button from "../button/Button.Component";
import DateInput from "../dateinput/DateInput.Component";
import * as StyledOverlay from "./CmsOverlay.Style";

const CmsOverlay = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  fields,
  mode = "update",
  resourceName = "entry",
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      // 1. Lock background scroll
      document.body.style.overflow = "hidden";

      // 2. Load data
      if (mode === "create") {
        setFormData({});
      } else if (mode === "update" && initialData) {
        const formattedData = { ...initialData };
        fields.forEach((field) => {
          if (field.type === "date" && formattedData[field.name]) {
            formattedData[field.name] = formattedData[field.name].split("T")[0];
          }
        });
        setFormData(formattedData);
      }
    }

    // Cleanup function to re-enable scroll when modal closes
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, mode, initialData, fields]);

  if (!isOpen) return null;

  const handleChange = (name, value, files) => {
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, mode);
  };

  const title =
    mode === "create" ? `New ${resourceName}` : `Update ${resourceName}`;

  return (
    <StyledOverlay.OverlayBackground onClick={onClose}>
      {/* stopPropagation prevents closing when clicking inside the modal */}
      <StyledOverlay.ModalContainer onClick={(e) => e.stopPropagation()}>
        <StyledOverlay.ModalTitle>{title}</StyledOverlay.ModalTitle>

        <StyledOverlay.Form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "0.85rem",
                  color: "#aaa",
                }}
              >
                {field.label}
              </label>

              {field.type === "date" ? (
                <DateInput
                  value={formData[field.name]}
                  onChange={(date) =>
                    handleChange(field.name, date ? date.toISOString() : null)
                  }
                  placeholder="Select date"
                />
              ) : (
                <Input
                  id={field.name}
                  type={field.type || "text"}
                  // Don't bind "value" for file inputs to avoid browser errors
                  value={
                    field.type === "file"
                      ? undefined
                      : formData[field.name] || ""
                  }
                  onChange={(e) =>
                    handleChange(field.name, e.target.value, e.target.files)
                  }
                />
              )}
            </div>
          ))}
          <StyledOverlay.ButtonGroup>
            <StyledOverlay.CancelButton type="button" onClick={onClose}>
              Cancel
            </StyledOverlay.CancelButton>
            <Button type="secondary" isSubmit>
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </StyledOverlay.ButtonGroup>
        </StyledOverlay.Form>
      </StyledOverlay.ModalContainer>
    </StyledOverlay.OverlayBackground>
  );
};

export default CmsOverlay;
