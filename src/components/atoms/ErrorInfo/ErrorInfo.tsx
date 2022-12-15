import { useEffect } from "react";
import Container from "react-bootstrap/Container";

interface ErrorInfoProps {
  redirectTo: string;
  title?: string;
  desc?: string;
  delay?: number;
  redirectButtonLabel?: string;
}

const ErrorInfo = ({
  redirectTo,
  title = "Podano nieprawidłowe parametry wyszukiwania",
  desc = "Przekierowuję na strone główną",
  delay = 5000,
  redirectButtonLabel = "Strona główna"
}: ErrorInfoProps) => {
  useEffect(() => {
    setTimeout(() => window.location.replace(redirectTo), delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <h1>{title}</h1>
      <h3>{desc}</h3>
      <a href={redirectTo}>{redirectButtonLabel}</a>
    </Container>
  );
};

export default ErrorInfo;
