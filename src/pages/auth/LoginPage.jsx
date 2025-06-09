import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/Form/FormLogin";
import FormOrganisasi from "../../components/Form/FormOrganisasi";
import FormPembeli from "../../components/Form/FormPembeli";

const LoginPage = () => {
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    setToken(tokenDariSS);

    if (tokenDariSS) {
      navigate("/homeafter");
    }
  }, [navigate]);

  return (
    !token && (
      <Container className="mt-5">
        <div className="text-center mb-3">
          {/* <img src={imgAH} width="200" alt="logo" /> */}
          <h1 className="mt-1 pb-1 fw-bold" style={{ color: "#fafaff" }}>
            Sign In
          </h1>
        </div>
        <FormLogin />
        <div className="text-center mt-4 text-muted">
          <p>
            Don't have an Account? Create Account <br />
            <Link
              to="/registerOrganisasi"
              style={{ color: "#5a374b", fontWeight: "600" }}
            >
              Organisasi
            </Link>{" "}
            or{" "}
            <Link
              to="/registerPembeli"
              style={{ color: "#5a374b", fontWeight: "600" }}
            >
              Pembeli
            </Link>
          </p>
        </div>
      </Container>
    )
  );
};

export default LoginPage;
