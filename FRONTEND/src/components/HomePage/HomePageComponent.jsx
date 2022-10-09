import NavbarComponent from "../navbar/Navbar";
import { Container, Row,  Button } from "react-bootstrap";
import "./HomePageComponent.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "../../index.css";
import logo from "../../assets/logo.png";
import fondo from "../../assets/fondo.jpg";
function HomePageComponent() {
	return (
		<>
			<NavbarComponent />
			<div>
				<Home />
			</div>
		</>
	);
}

function Home() {
	return (
		<>
			<Container className="container-fluid my-5" id="main-container">
				<div className="container" id="main-container">
					<div className="row">
						<div className="col ">
							<div className="row">
								<img
									className="Logo"
									src={logo}
									alt="Logo"
									style={{ width: 300 + "px" }}
								/>
							</div>
							<div className="row">
								<p>
									Envía rápido, fácil y económico Envía tus
									paquetes a nivel nacional con las mejores
									paqueterías de Colombia al menor costo en
									tan sólo unos clicks! Cotiza, compara y
									genera los envíos de tu tienda en línea,
									empresa o negocio. ¡Somos la Plataforma
									logística que hará crecer tu negocio!
								</p>
							</div>
							<div className="row">
								<div className="col text-center">
									<Button
										className="btn btn-create"
										type="submit"
                                        href="/signup">
										Registrarme
									</Button>
								</div>
							</div>
						</div>
						<div className="col px-5 py-4 my-5">
							<img
								className="img-fluid "
								src={fondo}
								alt="Fondo"
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}

export default HomePageComponent;
