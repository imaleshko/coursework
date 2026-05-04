import styles from "@/pages/Account/Fundraisers/FundraisingForm/FundraisingForm.module.css";
import { useNavigate, useParams } from "react-router";
import { useEditFundraising } from "@/pages/Account/Fundraisers/EditFundraising/useEditFundraising.ts";
import { type SubmitEvent, useEffect } from "react";
import FundraisingForm from "@/pages/Account/Fundraisers/FundraisingForm/FundraisingForm.tsx";
import { useFundraisingFormLogic } from "@/pages/Account/Fundraisers/FundraisingForm/useFundraisingFormLogic.ts";

const EditFundraising = () => {
  const { slug: currentSlug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const {
    fundraisingData,
    isLoadingData,
    updateFundraising,
    isPending,
    error: updateError,
  } = useEditFundraising(currentSlug!);
  const formLogic = useFundraisingFormLogic();

  const { setFormData, setRetainedImages } = formLogic;

  useEffect(() => {
    if (fundraisingData) {
      setFormData({
        title: fundraisingData.title,
        slug: fundraisingData.slug,
        description: fundraisingData.description,
        goal: fundraisingData.goal ? String(fundraisingData.goal) : "",
        endDate: fundraisingData.endDate || "",
      });
      setRetainedImages(fundraisingData.existingImagesUrls || []);
    }
  }, [fundraisingData, setFormData, setRetainedImages]);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!formLogic.validateForm()) return;

    updateFundraising(
      {
        title: formLogic.formData.title.trim(),
        slug: formLogic.formData.slug.trim(),
        description: formLogic.formData.description.trim(),
        goal: formLogic.formData.goal
          ? Number(formLogic.formData.goal)
          : undefined,
        endDate: formLogic.formData.endDate || undefined,
        retainedImages: formLogic.retainedImages,
        newImages: formLogic.newImages.map((img) => img.file),
      },
      { onSuccess: () => navigate("/account/fundraisers") },
    );
  };

  if (isLoadingData) {
    return (
      <div className={styles.loadingWrapper}>
        <p className={styles.loadingText}>Завантаження даних...</p>
      </div>
    );
  }

  return (
    <FundraisingForm
      title="Редагування збору"
      submitLabel="Зберегти зміни"
      isPending={isPending}
      serverError={updateError}
      originalSlug={fundraisingData?.slug}
      onSubmit={handleSubmit}
      {...formLogic}
    />
  );
};

export default EditFundraising;
