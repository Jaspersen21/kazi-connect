import { type ChangeEvent } from 'react';

type JobFilters = {
  location?: string;
  category?: string;
  jobType?: string;
};

type Props = {
  filters: JobFilters;
  onFilterChange: (next: JobFilters) => void;
};

const LOCATION_OPTIONS = ['', 'Remote', 'Lagos', 'Accra', 'Kampala', 'Nairobi'];
const CATEGORY_OPTIONS = ['', 'Software', 'Design', 'Marketing', 'Sales', 'Operations'];
const JOB_TYPE_OPTIONS = ['', 'Full-time', 'Part-time', 'Contract', 'Internship'];

export default function JobFiltersBar({ filters, onFilterChange }: Props) {
  const location = filters.location ?? '';
  const category = filters.category ?? '';
  const jobType = filters.jobType ?? '';

  const clear = () => {
    onFilterChange({ location: '', category: '', jobType: '' });
  };

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <select
        value={location}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          const next = e.target.value;
          onFilterChange({ location: next || undefined, category, jobType });
        }}
        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
      >
        {LOCATION_OPTIONS.map((opt) => (
          <option key={opt || 'all'} value={opt}>
            {opt ? opt : 'All locations'}
          </option>
        ))}
      </select>

      <select
        value={category}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          const next = e.target.value;
          onFilterChange({ location, category: next || undefined, jobType });
        }}
        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
      >
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt || 'all'} value={opt}>
            {opt ? opt : 'All categories'}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-3">
        <select
          value={jobType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            const next = e.target.value;
            onFilterChange({ location, category, jobType: next || undefined });
          }}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        >
          {JOB_TYPE_OPTIONS.map((opt) => (
            <option key={opt || 'all'} value={opt}>
              {opt ? opt : 'All job types'}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={clear}
          className="whitespace-nowrap rounded-xl bg-slate-900 px-3 py-3 text-white shadow-sm hover:bg-slate-800"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

