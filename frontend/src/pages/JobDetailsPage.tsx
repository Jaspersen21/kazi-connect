import { Link, useParams } from 'react-router-dom'
import { useJob } from '../hooks/useJob'
import { useApplyToJob } from '../hooks/useApplyToJob'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'

import { WhatsAppShareButton } from '../components/WhatsAppShareButton'

export default function JobDetailsPage() {

    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
    
    const { id } = useParams()

    const { data: job, isLoading, isError } = useJob(id)

    const applyMutation = useApplyToJob(id)

    if (isLoading) {
        return <p className='p-6 text-slate-600'>Loading job details...</p>
    }

    if (isError || !job) {
        return <p className='p-6 text-red-600'> Job not found</p>

    }

    const handleApply = () => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        applyMutation.mutate()
    }

    return (
        <main className='min-h-screen bg-slate-100 px-6 py 10'>
            <div className='mx-auto max-w-3xl'>
                <Link to= '/jobs'
                className='mb-6 inline-block text-sm font-medium text-violet-700 hover:text-violet-900'>
                    Back to Jobs
                </Link>
                <section className='rounded-2xl  border border-slate-200 bg-white p-8 shadow-sm'>
                    
                    <h1 className=' text-3xl font-bold text-slate-900'>{job.title}</h1>
                    <p className='mt-2 text-large font-medium text-violet-700'>{job.company}</p>

                    <div className='mt-6 border-t border-slate-200 pt-6'>
                        <h2 className='text-lg font-semibold text-slate-900'>Job Description</h2>

                        <p className= 'mt-3 leading-7 text-slate-700'>
                            {job.description}
                        </p>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <button 
                        onClick={handleApply}
                        disabled={applyMutation.isPending || applyMutation.isSuccess}
                        className='rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 flex-1'>
                            {applyMutation.isPending 
                            ? 'Applying...'
                            : applyMutation.isSuccess
                            ? 'Applied'
                            : 'Apply Now'}
                        </button>

                        <WhatsAppShareButton
                          jobTitle={job.title}
                          jobId={job.id}
                          className="flex-1"
                        />
                    </div>

                    {applyMutation.isSuccess && (
                        <p className='mt-4 text-sm font-medium text-emerald-600'>Application successful!</p>
                    )}
                    {applyMutation.isError && (
                        <p className='mt-4 text-sm font-medium text-rose-600'>Failed to apply. You may have already applied for this job.</p>
                    )}
                </section>
            </div>
        </main>
    )
}