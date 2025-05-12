import { useState } from "react";
import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormLogin = () => {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    conts
}