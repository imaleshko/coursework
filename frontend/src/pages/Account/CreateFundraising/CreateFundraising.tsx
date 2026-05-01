import styles from "./CreateFundraising.module.css";
import { useNavigate } from "react-router";
import MDEditor from "@uiw/react-md-editor";
import { useCreateFundraising } from "@/hooks/useCreateFundraising.ts";
import {
  type ChangeEvent,
  type DragEvent,
  type SubmitEventHandler,
  useRef,
  useState,
} from "react";

const INITIAL_FORM = {
  title: "",
  slug: "",
  description: "",
  goal: "",
  endDate: "",
};

const validate = (form: typeof INITIAL_FORM) => {
  const errors: Record<string, string> = {};
  if (!form.title.trim()) errors.title = "Назва обов'язкова";
  if (!form.slug.trim()) errors.slug = "Slug обов'язковий";
  else if (!/^[a-z0-9-]+$/.test(form.slug))
    errors.slug = "Тільки малі літери, цифри та дефіс";
  if (!form.description.trim()) errors.description = "Опис обов'язковий";
  if (form.goal && Number(form.goal) <= 0)
    errors.goal = "Ціль має бути більшою за 0";
  return errors;
};

type ImageEntry = { file: File; previewUrl: string };

const CreateFundraising = () => {
  const navigate = useNavigate();
  const {
    createFundraising,
    isPending,
    error: createError,
  } = useCreateFundraising();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value?: string) => {
    setErrors((prev) => ({ ...prev, description: "" }));
    setFormData((prev) => ({
      ...prev,
      description: value === undefined ? "" : value,
    }));
  };

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const entries = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...entries]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    createFundraising(
      {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim(),
        goal: formData.goal ? Number(formData.goal) : undefined,
        endDate: formData.endDate || undefined,
        images: images.map((img) => img.file),
      },
      {
        onSuccess: () => navigate("/account/fundraisers"),
      },
    );
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Створення нового збору</h2>

        {createError && (
          <p className={`${styles.errorText} ${styles.serverError}`}>
            {createError}
          </p>
        )}

        <div className={styles.inputs}>
          <label htmlFor="title" className={styles.label}>
            Назва збору
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Введіть назву збору"
            className={styles.formInput}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className={styles.errorText}>{errors.title}</p>}

          <label htmlFor="slug" className={styles.label}>
            Slug для посилання (наприклад: /for-my-happiness)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            placeholder="Введіть slug"
            className={styles.formInput}
            value={formData.slug}
            onChange={handleChange}
          />
          {errors.slug && <p className={styles.errorText}>{errors.slug}</p>}

          <label htmlFor="description" className={styles.label}>
            Опис збору
          </label>
          <div data-color-mode="dark" className={styles.editorWrapper}>
            <MDEditor
              value={formData.description}
              onChange={handleDescriptionChange}
              height={300}
              textareaProps={{
                id: "description",
                placeholder: "Введіть опис збору",
              }}
            />
          </div>
          {errors.description && (
            <p className={styles.errorText}>{errors.description}</p>
          )}

          <label htmlFor="goal" className={styles.label}>
            Фінансова ціль (опціонально)
          </label>
          <input
            id="goal"
            name="goal"
            type="number"
            placeholder="Введіть суму"
            className={styles.formInput}
            value={formData.goal}
            onChange={handleChange}
            min="1"
          />
          {errors.goal && <p className={styles.errorText}>{errors.goal}</p>}

          <label htmlFor="endDate" className={styles.label}>
            Дата завершення (опціонально)
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            className={styles.formInput}
            value={formData.endDate}
            onChange={handleChange}
          />

          <label htmlFor="images" className={styles.label}>
            Фотографії для збору
          </label>
          <div
            className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ""}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e: DragEvent) => {
              e.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={(e: DragEvent) => {
              e.preventDefault();
              setIsDragActive(false);
            }}
            onDrop={(e: DragEvent) => {
              e.preventDefault();
              setIsDragActive(false);
              addFiles(e.dataTransfer.files);
            }}
          >
            <p className={styles.dropzoneText}>
              Перетягніть фотографії або натисніть для вибору
            </p>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>

          {images.length > 0 && (
            <div className={styles.previewGrid}>
              {images.map(({ previewUrl }, i) => (
                <div key={previewUrl} className={styles.previewItem}>
                  <img
                    src={previewUrl}
                    className={styles.previewImage}
                    alt={"Фото"}
                  />
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeImage(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isPending}
          >
            Створити збір
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFundraising;
