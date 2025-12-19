import s from './Panel.module.css';

export default function Panel({ children, className = '' }) {
  return (
    <div className={`${s.panel} ${className}`}>
      {children}
    </div>
  );
}
