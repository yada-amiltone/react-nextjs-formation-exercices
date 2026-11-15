export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <span className="mode-banner solution">✅ Solution</span>
      {children}
    </>
  )
}
