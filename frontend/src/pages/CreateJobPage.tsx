import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import { useCreateJob } from "../hooks/useCreateJob";
import type { JobFormValues } from "../types/job";

const emptyForm: JobFormValues = {
  title: "",
  company: "",
  description: "",
};

export default function CreateJobPage() {
  const [values, setValues] = useState<JobFormValues>(emptyForm);
  const navigate = useNavigate();
  const createJobMutation = useCreateJob();

  function handleSubmit(formValues: JobFormValues) {
    createJobMutation.mutate(formValues, {
      onSuccess: () => {
        navigate("/jobs");
      },
    });
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Create Job
          </h1>

          <p className="mt-2 text-slate-600">
            Post a new opportunity for job seekers on Kazi Connect.
          </p>
        </div>

        <JobForm
          values={values}
          onChange={setValues}
          onSubmit={handleSubmit}
          submitLabel="Create Job"
          isSubmitting={createJobMutation.isPending}
        />

        {createJobMutation.isError && (
          <p className="text-slate-600">
            Failed to create job. Please try again.
          </p>
        )}
      </div>
    </main>
  );
}