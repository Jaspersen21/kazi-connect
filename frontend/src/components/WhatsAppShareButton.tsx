export function WhatsAppShareButton({
  jobTitle,
  jobId,
  className,
}: {
  jobTitle: string
  jobId: string
  className?: string
}) {
  const shareToWhatsApp = (title: string, id: string) => {
    const url = `${window.location.origin}/jobs/${id}`
    const text = `Check out this job on Kazi Connect: ${title} — ${url}`
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        // Prevent navigation when used inside a Link
        e.preventDefault()
        e.stopPropagation()
        shareToWhatsApp(jobTitle, jobId)
      }}
      className={
        className ??
        'flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'
      }
    >
      Share on WhatsApp
    </button>
  )
}

