import React, { useState } from 'react';
import { Button, Form, FloatingLabel, Spinner, Container } from "react-bootstrap";
import Joi from 'joi';
import http from '../../services/httpService';

const uri = process.env.REACT_APP_API_ENDPOINT + "/branch_manager";

const MangerLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({})
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    })
    const handleSubmit = async () => {
        setErrors({});
        const {error, } = schema.validate({username, password}, {abortEarly: false});
        if (error) {
            const errors = {};
            for (const item of error.details)
                errors[item.path[0]] = item.message;
            setErrors(errors);
            return;
        }
        setSubmitting(true);
        try {
            const response = await http.post(uri, {username, password});
            localStorage.setItem('manager_token', response.data.token);
            window.location = "/branch/manage";
        }
        catch (e) {
            setSubmitting(false);
        }
    }
    return (
        <Container style={{width: "50vw"}}>
            <h1 className="mt-3">Branch Manager Login</h1>
            <Form>
                <FloatingLabel label="Username" className="mb-3 flex-grow-1">
                    <Form.Control type="text"
                                  placeholder="username"
                                  value={username}
                                  onChange={e => setUsername(e.currentTarget.value)}
                                  style={errors.username ? {borderColor: "orange"} : {}}/>
                    {errors.username && <Form.Text>{errors.username}</Form.Text>}
                </FloatingLabel>
                <FloatingLabel label="Password" className="mb-3">
                    <Form.Control type={showPassword ? "text" : "password"}
                                  placeholder="Password"
                                  value={password}
                                  onChange={e => setPassword(e.currentTarget.value)}
                                  style={errors.password ? {borderColor: "orange"} : {}}/>
                    {errors.password && <Form.Text>{errors.password}</Form.Text>}
                </FloatingLabel>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Show Password" onChange={() => {
                        setShowPassword(!showPassword)
                    }}/>
                </Form.Group>
                <Button onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "Submitting" : "Login"}
                    {submitting && <Spinner as="span" size="sm" animation="border" style={{marginLeft: "5px"}}/>}
                </Button>
            </Form>
        </Container>
    );
};

export default MangerLogin;