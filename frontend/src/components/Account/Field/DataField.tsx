import styles from "./DataField.module.css";
import editIcon from "@/assets/edit.png";
import { type ChangeEvent, useState } from "react";

interface DataFieldProps {
  label: string;
  value: string;
  type: "text" | "password" | "email";
  onSave: (newValue: string, onSuccess: () => void) => void;
  isPending: boolean;
  serverError: string | null;
  validate?: (value: string) => string | null;
}

const DataField = ({
  label,
  value,
  type,
  onSave,
  isPending,
  serverError,
  validate,
}: DataFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (localError) setLocalError(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setInputValue("");
    setLocalError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputValue(value);
    setLocalError(null);
  };

  const handleSave = () => {
    if (inputValue === value) {
      setIsEditing(false);
      return;
    }

    if (validate) {
      const validationError = validate(inputValue);
      if (validationError) {
        setLocalError(validationError);
        return;
      }
    }

    onSave(inputValue, () => setIsEditing(false));
  };

  const error = localError || serverError;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputsGroup}>
        <input
          type={type}
          value={isEditing ? inputValue : value}
          onChange={handleChange}
          readOnly={!isEditing}
          className={styles.input}
          placeholder={isEditing ? "Введіть нові дані..." : ""}
        />
        {!isEditing && (
          <button
            type="button"
            className={styles.button}
            onClick={handleEditClick}
          >
            <img src={editIcon} alt="edit" width={30} height={30} />
          </button>
        )}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      {isEditing && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isPending}
          >
            Зберегти
          </button>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
            disabled={isPending}
          >
            Скасувати
          </button>
        </div>
      )}
    </div>
  );
};

export default DataField;
