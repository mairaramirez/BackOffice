import s from './Card.module.css';

export default function Card({ title, children }) {
  return (
    <div className={s.card} role="region" aria-label={title || 'Card'}>
      {title && <div className={s.title}>{title}</div>}
      {children}
    </div>
  );
}



/* export default function Card({ title, children }){
  return (
    <div className={s.card} role="region" aria-label={title||'Card'}>
      {title && <div className={s.title}>{title}</div>}
      {children}
    </div>
  )
} */
