import { useLocation } from "react-router-dom";

import './Pages.css';

export const Footer = () => {
  const location = useLocation();

  return (
    <footer className={location.pathname === '/chat' ? 'noDisplay' : ''}>
      <div>
        <p className={'footerLink'}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://github.com/NataliiaRybalka"
              target="blank"
            >
              Nataliia Rybalka
            </a>
          </span>
        </p>
      </div>
    </footer>
  )
};