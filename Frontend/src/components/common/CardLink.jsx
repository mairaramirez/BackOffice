import { useNavigate } from 'react-router-dom';
import s from './CardLink.module.css';

export default function CardLink({ to, children, className = '', ...rest }) {
  const navigate = useNavigate();

  const handleKey = (e) => {
    if (e.key === 'Enter') navigate(to);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      className={`${s.cardLink} ${className}`}
      onClick={() => 
        navigate(to)
      }
      onKeyDown={handleKey}
      {...rest}
    >
      {children}
    </div>
  );
}
