import type { JobFormValues } from "../types/job";

type JobFormProps = {
  values: JobFormValues;
  onChange: (values: JobFormValues) => void;
  onSubmit: (values: JobFormValues) => void;
  submitLabel: string;
  isSubmitting?: boolean;
};

export default function JobForm({
  values,
  onChange,
  onSubmit,
  submitLabel,
  isSubmitting = false,
}: JobFormProps) {
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    onChange({
      ...values,
      [name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm p-6 space-y-6"
    >
      <div className="space-y-2">
        <label className="text-slate-700 font-medium">Job Title</label>

        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900"
          placeholder="Frontend Developer"
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-700 font-medium">Company</label>

        <input
          name="company"
          value={values.company}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900"
          placeholder="ABC Company"
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-700 font-medium">Description</label>

        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900"
          placeholder="Describe the role, responsibilities, and requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 py-3 disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}