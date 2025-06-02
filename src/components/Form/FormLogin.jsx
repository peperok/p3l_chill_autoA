import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { SignIn } from "../../api/apiAuth";
import { toast } from "react-toastify";

const FormLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setData(newData);

    setIsDisabled(
      !(newData.email.trim().length > 0 && newData.password.length > 0)
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await SignIn(data);
    } catch (error) {
      toast.error("Login gagal: " + (error.message || "Terjadi kesalahan"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
      style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <div className="bg-white rounded-3 shadow p-4">
            <div
              className="text-center p-3 mb-4 rounded"
              style={{ backgroundColor: "#937f6a", color: "#f5f5f5" }}
            >
              <h3 className="mb-2">
                <strong>Reuse Mart</strong>
              </h3>
              <p>Selamat datang. Silakan masuk ke akun Anda.</p>
            </div>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Masukkan Email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Masukkan Password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                variant="warning"
                type="submit"
                disabled={isDisabled || loading}
                className="w-100"
                style={{ fontWeight: "600" }}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLogin;
