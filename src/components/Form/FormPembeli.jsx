import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";

const FormPembeli = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    nama_pembeli: "",
    tlpn_pembeli: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setData(newData);

    const isValid =
      newData.nama_pembeli.trim() !== "" &&
      newData.tlpn_pembeli.trim() !== "" &&
      newData.email.trim() !== "" &&
      newData.password.trim() !== "";

    setIsDisabled(!isValid);
  };

  const Register = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/registerPembeli",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("🔁 Respons dari server:", result);

      if (response.ok) {
        console.log("✅ Registrasi berhasil");
        navigate("/HomeAfter");
      } else {
        console.warn("❌ Registrasi gagal:", result.message || result);
        alert("Registrasi gagal: " + (result.message || "Terjadi kesalahan"));
      }
    } catch (err) {
      console.error("❌ Error jaringan / server:", err);
      alert("Terjadi error saat menghubungi server");
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
              <p>Daftar untuk membuat akun baru.</p>
            </div>

            <Form onSubmit={Register}>
              <Form.Group className="mb-3" controlId="nama_pembeli">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="nama_pembeli"
                  placeholder="Masukkan Username"
                  value={data.nama_pembeli}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="tlpn_pembeli">
                <Form.Label>Telepon</Form.Label>
                <Form.Control
                  type="text"
                  name="tlpn_pembeli"
                  placeholder="Masukkan Nomor Telepon"
                  value={data.tlpn_pembeli}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Masukkan Email"
                  value={data.email || ""}
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
                  "Register"
                )}
              </Button>
            </Form>

            <div className="text-center mt-4 text-muted">
              <p>
                Already have an Account?{" "}
                <Link
                  to="/login"
                  style={{ color: "#5a374b", fontWeight: "600" }}
                >
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

export default FormPembeli;
