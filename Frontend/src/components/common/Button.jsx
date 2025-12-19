import s from './Button.module.css'
export default function Button({ children, variant = 'default', ...props }) {
  const cls = [s.btn]
  if (variant === 'primary') cls.push(s.primary)
  if (variant === 'ghost') cls.push(s.ghost)
  return (
    <button className={cls.join(' ')} {...props}>{children}</button>
  )
}
