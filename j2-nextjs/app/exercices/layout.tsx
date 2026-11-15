export default function ExercicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <span className="mode-banner exercice">✏️ Mon exercice</span>
      {children}
    </>
  )
}
