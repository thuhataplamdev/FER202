import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const SubmitForm = ({ title, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        phone: "",
        gender: "",
        agree: true,
    });

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    // Xử lý thay đổi giá trị input
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Validate dữ liệu
    const validateForm = () => {
        const newErrors = {};

        // Validate tên
        if (!formData.name.trim()) {
            newErrors.name = "Tên không được để trống!";
        } else if (formData.name.length < 3 || formData.name.length > 50) {
            newErrors.name = "Tên phải từ 3 đến 50 ký tự!";
        }

        // Validate tuổi
        const ageNum = parseInt(formData.age, 10);
        if (!formData.age) {
            newErrors.age = "Tuổi không được để trống!";
        } else if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
            newErrors.age = "Tuổi phải nằm trong khoảng từ 18 đến 100!";
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống!";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email không hợp lệ!";
        }

        // Validate số điện thoại
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = "Số điện thoại không được để trống!";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Số điện thoại phải từ 10–15 chữ số!";
        }
        // Validate giới tính
        if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính!";

        // Validate điều khoản
        if (!formData.agree) {
            newErrors.agree = "Bạn phải đồng ý với điều khoản!";
        }

        setErrors(newErrors);
        setShowAlert(Object.keys(newErrors).length > 0);

        return Object.keys(newErrors).length === 0;
    };

    // Xử lý submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowAlert(false);
            onSubmit(formData);
        }
    };

    return (
        <Container style={{ maxWidth: "1000px" }}>
            <h3 className="my-3 text-center">{title}</h3>

            {showAlert && (
                <Alert variant="danger">
                    <strong>Lỗi:</strong> Vui lòng kiểm tra lại các trường hợp lỗi.
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                {/* Tên */}
                <Form.Group className="mb-3">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Tuổi */}
                <Form.Group className="mb-3">
                    <Form.Label>Tuổi</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        isInvalid={!!errors.age}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.age}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Số điện thoại */}
                <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        isInvalid={!!errors.gender}
                    >
                        <option value="">-- Chọn giới tính --</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.gender}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Checkbox điều khoản */}
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        name="agree"
                        label="Tôi đồng ý với điều khoản"
                        checked={formData.agree}
                        onChange={handleChange}
                        isInvalid={!!errors.agree}
                    />
                    {errors.agree && (
                        <div className="text-danger" style={{ fontSize: "0.9rem" }}>
                            {errors.agree}
                        </div>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Gửi
                </Button>
            </Form>
        </Container>
    );
};

SubmitForm.propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default SubmitForm;