import { Container } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormOrganisasi from "../../components/Form/FormOrganisasi";

const RegisterOrganisasiPage = () => {
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
          <h1 className="mt-1 pb-1 fw-bold" style={{ color: "#333" }}>
            Register Organisasi
          </h1>
        </div>
        <FormOrganisasi />
      </Container>
    )
  );
};

export default RegisterOrganisasiPage;
