import React from "react";
import { useState } from "react";
import "../../index.css";
import * as API from "../../services/users-services";

import { Link } from "react-router-dom";
import { Form, Button, Container, Alert, Col, Row } from "react-bootstrap";

const SignUp = () => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [username, setUsename] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [register, setRegister] = useState(false);

  const data = {
    identification: id,
    name: name,
    lastname: lastname,
    address: address,
    city: city,
    username: username,
    email: email,
    password: password,
  };
 
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await API.signup(data)
        .then((result) => {
          setRegister(true);
          console.log(result);
          resetDataForm();
        })
        .catch( (error) => {
          console.log(error);
						let message = typeof error.response !== "undefined" ? error.response.data.Error : error.Error;
            console.log(message);
						if(message.length > 1){
							alert(message[0].msg)
						}else{
							alert(message)
						}
        });
    } catch (error) {
      console.log(error);
    }
  };

	const resetDataForm = () => {
		setId("");
		setName("");
		setLastname("");
		setAddress("");
		setCity("");
		setUsename("");
		setEmail("");
		setPassword("");
	};

	return (
		<>
			<Container id="main-container" className="d-grid">
				<Row className="form-container border rounded  px-5 py-2 my-5">
					<Form id="reg-in-order " >
						<div className="row">
							<h2 className="form-titulo text-center  my-4">
								Registro de Usuario
							</h2>
							{register ? (
								<Alert variant="success"> Submited </Alert>
							) : (
								<Alert variant="danger"> Ohh No! </Alert>
							)}
						</div>
						<div className="row">
							<div className="col">
								<div className="row">
									<div className="col">
										<Form.Group
											controlId="id"
											className="m-3">
											{/* <Form.Label>Email address</Form.Label> */}
											<Form.Control
												className="form-control"
												type="text"
												placeholder="Enter your identifcation number"
												name="id"
												value={id}
												onChange={(e) =>
													setId(e.target.value)
												}
											/>
										</Form.Group>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<Form.Group
											controlId="name"
											className="m-3">
											{/* <Form.Label>Email address</Form.Label> */}
											<Form.Control
												type="text"
												placeholder="Enter Name"
												name="name"
												value={name}
												onChange={(e) =>
													setName(e.target.value)
												}
											/>
										</Form.Group>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<Form.Group
											controlId="lastname"
											className="m-3">
											{/* <Form.Label>Email address</Form.Label> */}
											<Form.Control
												type="text"
												placeholder="Enter Lastname"
												name="lastname"
												value={lastname}
												onChange={(e) =>
													setLastname(e.target.value)
												}
											/>
										</Form.Group>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<Form.Group
											controlId="address"
											className="m-3">
											{/* <Form.Label>Email address</Form.Label> */}
											<Form.Control
												type="text"
												placeholder="Enter address location"
												name="address"
												value={address}
												onChange={(e) =>
													setAddress(e.target.value)
												}
											/>
										</Form.Group>
									</div>
								</div>
								<div className="row">
									<div className="col text-center">
										<Button
											variant="primary"
											type="submit"
											className="btn btn-create m-3"
											onClick={(e) => handleSubmit(e)}>
											Registrarse
										</Button>
									</div>
								</div>
							</div>
							<div className="col">
								<div className="row">
									<div className="col">
										<Form.Group
											controlId="city"
											className="m-3">
											{/*  <Form.Label>Email address</Form.Label> */}
											<Form.Control
												type="text"
												placeholder="Enter city location"
												name="city"
												value={city}
												onChange={(e) =>
													setCity(e.target.value)
												}
											/>
										</Form.Group>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<Form.Group
											controlId="username"
											className="m-3">
											{/* <Form.Label>Email address</Form.Label> */}
											<Form.Control
												type="text"
												placeholder="Enter userName"
												name="username"
												value={username}
												onChange={(e) =>
													setUsename(e.target.value)
												}
											/>
										</Form.Group>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<Form.Group
											controlId="email"
											className="m-3">
											{/*  <Form.Label>Email address</Form.Label> */}
											<Form.Control
												type="email"
												placeholder="Enter email"
												name="email"
												value={email}
												onChange={(e) =>
													setEmail(e.target.value)
												}
											/>
										</Form.Group>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<Form.Group
											controlId="password"
											className="m-3">
											{/*  <Form.Label>Email address</Form.Label> */}
											<Form.Control
												type="password"
												placeholder="Enter password"
												name="password"
												value={password}
												onChange={(e) =>
													setPassword(e.target.value)
												}
											/>
										</Form.Group>
									</div>
								</div>
								<div className="row">
									<div className="col text-center">
										<Link
											to={"/login"}
											type="submit"
											className="m-3 btn btn-secondary">
											Iniciar Sesion
										</Link>
									</div>
								</div>
							</div>
						</div>
					</Form>
				</Row>
			</Container>
		</>
	);
};

export default SignUp;

/*import { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./SignupComponent.css";
import Container from "react-bootstrap/Container";
import NavbarComponent from "../navbar/Navbar";

function SignupComponent() {
  const [validate, setValidate] = useState(true);
  const [path, setPath] = useState("/");
  const [form, setForm] = useState({
    email: "",
    user: "",
    password: "",
    passwordConf: "",
  });

  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const submitForm = () => {
    var formato_email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    var passid_len = form.password.length;
    var passid_len2 = form.passwordConf.length;
    var username_len = form.username.length;
    if (!form.email.match(formato_email)) {
      alert("Debes ingresar un email electronico valido!");
      focus();
      setValidate(false);
    } else if (username_len <= 8) {
      alert("Debes ingresar un nombre de usuario con mas de 8 caracteres");
      focus();
    } else if (passid_len <= 8) {
      alert("Debes ingresar una password con mas de 8 caracteres");
      focus();
    } else if (passid_len != passid_len2) {
      alert("Las constraseñas deben coincidir");
      focus();
    } else {
      setValidate(true);
      setPath("/signup");
    }
    console.log(validate);
  };

  return (
    <>
      <NavbarComponent />
      <Container id="main-container">
        <h1 className="text-center mt-3"> Sign Up</h1>
        <div className="login-container">
          <div className="login-image">
            <img src="" />
          </div>
          <Form id="formSignup">
            <Form.Group className="mb-6">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                id="email"
                name="email"
                value={form.email}
                onChange={onUpdateField}
              />
            </Form.Group>

            <Form.Group className="mb-6">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de usuario"
                id="username"
                name="username"
                value={form.username}
                onChange={onUpdateField}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                id="password"
                name="password"
                value={form.password}
                onChange={onUpdateField}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirmar password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmar contraseña"
                id="passwordConf"
                name="passwordConf"
                value={form.passwordConf}
                onChange={onUpdateField}
              />
            </Form.Group>

            <Link
              to={`${path}`}
              className="btn btn-primary"
              onClick={submitForm}
            >
              {" "}
              Submit{" "}
            </Link>
          </Form>
        </div>
      </Container>
    </>
  );
} */
