import { useEffect, useState } from 'react';

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
  const [location, setLocation] = useState(filters.location ?? '');
  const [category, setCategory] = useState(filters.category ?? '');
  const [jobType, setJobType] = useState(filters.jobType ?? '');

  // Keep local state in sync when parent filters change
  useEffect(() => {
    // Avoid cascaded renders by only updating if values actually differ
    const nextLocation = filters.location ?? '';
    const nextCategory = filters.category ?? '';
    const nextJobType = filters.jobType ?? '';

    setLocation((prev) => (prev === nextLocation ? prev : nextLocation));
    setCategory((prev) => (prev === nextCategory ? prev : nextCategory));
    setJobType((prev) => (prev === nextJobType ? prev : nextJobType));
  }, [filters.location, filters.category, filters.jobType]);


  const clear = () => {
    setLocation('');
    setCategory('');
    setJobType('');
    onFilterChange({ location: '', category: '', jobType: '' });
  };

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <select
        value={location}
        onChange={(e) => {
          const next = e.target.value;
          setLocation(next);
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
        onChange={(e) => {
          const next = e.target.value;
          setCategory(next);
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
          onChange={(e) => {
            const next = e.target.value;
            setJobType(next);
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

