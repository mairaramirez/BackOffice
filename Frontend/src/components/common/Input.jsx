import s from './Input.module.css'
export default function Input({ label, id, error, ...props }){
  return (
    <div className={s.field}>
      {label && <label className={s.label} htmlFor={id}>{label}</label>}
      <input id={id} className={s.input} aria-invalid={!!error} {...props} />
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}
