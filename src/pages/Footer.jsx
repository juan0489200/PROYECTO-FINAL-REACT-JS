function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-2 sticky-footer" role="contentinfo">
      <small className="fw-light">
        Desarrollado por <span className="fw-bold">JotaDe</span> © {new Date().getFullYear()}
      </small>
    </footer>
  );
}

export default Footer;
