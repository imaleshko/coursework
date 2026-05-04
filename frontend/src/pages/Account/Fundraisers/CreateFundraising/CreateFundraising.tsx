import { useNavigate } from "react-router";
import { useCreateFundraising } from "@/hooks/useCreateFundraising.ts";
import { type SubmitEvent } from "react";
import FundraisingForm from "@/pages/Account/Fundraisers/FundraisingForm/FundraisingForm.tsx";
import { useFundraisingFormLogic } from "@/pages/Account/Fundraisers/FundraisingForm/useFundraisingFormLogic.ts";

const CreateFundraising = () => {
  const navigate = useNavigate();
  const {
    createFundraising,
    isPending,
    error: createError,
  } = useCreateFundraising();
  const formLogic = useFundraisingFormLogic();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!formLogic.validateForm()) return;

    createFundraising(
      {
        title: formLogic.formData.title.trim(),
        slug: formLogic.formData.slug.trim(),
        description: formLogic.formData.description.trim(),
        goal: formLogic.formData.goal
          ? Number(formLogic.formData.goal)
          : undefined,
        endDate: formLogic.formData.endDate || undefined,
        images: formLogic.newImages.map((img) => img.file),
      },
      { onSuccess: () => navigate("/account/fundraisers") },
    );
  };

  return (
    <FundraisingForm
      title="Створення нового збору"
      submitLabel="Створити збір"
      isPending={isPending}
      serverError={createError}
      onSubmit={handleSubmit}
      {...formLogic}
    />
  );
};

export default CreateFundraising;
