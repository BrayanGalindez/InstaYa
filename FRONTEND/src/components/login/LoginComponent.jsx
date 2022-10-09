import { useState } from "react";
import { Form, Button, Alert, Container, Row } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../../index.css";
const cookies = new Cookies();

import "./Login.css";

import * as API from "../../services/users-services";

function LoginComponent() {
	const [validate, setValidate] = useState(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const onUpdateField = (e) => {
		const nextFormState = {
			...form,
			[e.target.name]: e.target.value,
		};
		setForm(nextFormState);
	};

	const data = {
		email: form.email,
		password: form.password,
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await API.login(data)
				.then((response) => {
					cookies.set("TOKEN", response.accessToken, {
						path: "/",
					});
					setValidate(true);
					window.location.href = "/HomePage";
				})
				.catch((error) => {
					console.log(error);
					let message =
						typeof error.response !== "undefined"
							? error.response.data.message
							: error.message;
					if (message.length > 1) {
						let msg = JSON.stringify(message);
						alert(msg);
					} else {
						alert(message);
					}
				});
		} catch (error) {
			error = new Error();
			console.log(error);
		}
	};

	return (
		<>
			<Container id="main-container" className="d-grid">
				<Row className="form-container border rounded  px-5 py-2 my-5">
					<div className="login-container d-flex align-items-center justify-content-center w-100 my-4">
						<div className="login-image">
							<img src="" />
						</div>
						<Form
							id="reg-in-order"
							className="py-3 align-items-center"
							style={{ width: 350 + "px" }}
							onSubmit={(e) => handleSubmit(e)}>

							<div className="row text-center">
								<div className="col">
									<h1 className="form-titulo text-center mt-3">
										Iniciar Sesión
									</h1>
								</div>
							</div>
						<div>
							<Form.Group className="my-4 mb-3">
								<Form.Label>Correo electronico</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									id="email"
									name="email"
									value={form.email}
									onChange={onUpdateField}
								/>
							</Form.Group>
						</div>
							<Form.Group className="mb-3">
								<Form.Label>Contraseña</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									id="password"
									name="password"
									value={form.password}
									onChange={onUpdateField}
								/>
							</Form.Group>
							<div className="row text-center">
								<div className="col">
									<Button
										variant="primary"
										type="submit"
										className="btn btn-create"
										onClick={(e) => handleSubmit(e)}>
										Iniciar Sesion
									</Button>
									{validate ? (
										<p className="text-success">
											You Are Logged in Successfully
										</p>
									) : (
										<p className="text-danger">
											You Are Not Logged in
										</p>
									)}
								</div>
								<div className="col">
								<Button
										className="btn btn-secondary"
										type="submit"
                                        href="/signup">
										Registrarme
									</Button>
								</div>
							</div>
						</Form>
					</div>
				</Row>
			</Container>
		</>
	);
}

export default LoginComponent;
