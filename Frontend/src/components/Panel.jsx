export default function Panel({ children }){
  return (
    <div style={{
      background:'var(--surface, var(--sh-white))',
      border:'1px solid var(--sh-border)'.trim(),
      borderRadius:'12px',
      boxShadow:'var(--shadow-s)',
      padding:'16px'
    }}>
      {children}
    </div>
  )
}
