import { useNavigate } from 'react-router-dom';
import '../../styles/ui.css';


export default function BackButton({ to, className = '' }) {
  const navigate = useNavigate();

  const onClick = () => {
    const hasHistory =
      typeof window !== 'undefined' &&
      window.history &&
      window.history.length > 1;

    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(to || '/');
    }
  };

  return (
    <button
      type="button"
      className={`ui-back-button ${className}`}
      aria-label="Volver"
      onClick={onClick}
    >
      ←
    </button>
  );
}
