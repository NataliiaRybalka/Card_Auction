import './Pages.css';

export const Footer = () => {

  return (
    <footer>
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