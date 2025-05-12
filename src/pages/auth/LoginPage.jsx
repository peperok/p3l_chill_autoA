import { Container } from "react-bootstrap";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLogin from '../../components/Form/FormLogin';

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

    return !token && (
        <Container className="mt-5">
            <div className="text-center mb-3">
                {/* <img src={imgAH} width="200" alt="logo" /> */}
                <h1 className="mt-1 pb-1 fw-bold" style={{ color: "#fafaff" }}>
                    Sign In
                </h1>
            </div>
            <FormLogin />
            
        </Container>
    );
};

export default LoginPage;