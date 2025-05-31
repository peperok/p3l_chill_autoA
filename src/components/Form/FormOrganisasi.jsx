import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";

const FormRegister = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    namaOrganisasi: "",
    alamat: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setData(newData);

    // Validasi: semua field wajib diisi
    if (
      newData.username.trim().length > 0 &&
      newData.email.trim().length > 0 &&
      newData.password.length > 0 &&
      newData.namaOrganisasi.trim().length > 0 &&
      newData.alamat.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const Register = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      setTimeout(() => {
        navigate("/homeafter");
        console.log("Registration successful");
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
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
              <p>Daftar untuk membuat akun baru.</p>
            </div>

            <Form onSubmit={Register}>
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

              <Form.Group className="mb-3" controlId="namaOrganisasi">
                <Form.Label>Nama Organisasi</Form.Label>
                <Form.Control
                  type="text"
                  name="namaOrganisasi"
                  placeholder="Masukkan Nama Organisasi"
                  value={data.namaOrganisasi}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="alamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="alamat"
                  placeholder="Masukkan Alamat"
                  value={data.alamat}
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
                  "Register"
                )}
              </Button>
            </Form>

            <div className="text-center mt-4 text-muted">
              <p>
                Already have an Account?{" "}
                <Link to="/login" style={{ color: "#5a374b", fontWeight: "600" }}>
                  Click Here!
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormRegister;
