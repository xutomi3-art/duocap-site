export default function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        {label}
      </span>
      {tag && (
        <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/50">
          {tag}
        </span>
      )}
    </div>
  )
}
