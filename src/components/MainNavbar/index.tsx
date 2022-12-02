import { FC } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const MainNavbar: FC = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src="/images/logo.png" />
          </Link>
        </Navbar.Brand>
        adads
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
