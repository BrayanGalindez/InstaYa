import { Container, Row } from "react-bootstrap";
import NavbarComponent from "../navbar/Navbar";
import { useState } from "react";
import Cookies from "universal-cookie";

import * as API from "../../services/send-services";
import "./regorders.css";
import { Link } from "react-router-dom";

const cookies = new Cookies();

function Regorder() {
  const token = cookies.get("TOKEN");

  const [form, setForm] = useState({});

  const {
    codeSend,
    formDate,
    formDesc,
    formTime,
    formLong,
    formWidth,
    formHeight,
    formWeight,
    formCity,
    formAddress,
    formIdentificationD,
    formNameD,
    formCityD,
    formAddressD,
  } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const data = {
    codeSend: codeSend,
    description: formDesc,
    dateSend: formDate,
    hourSend: formTime,
    large: formLong,
    width: formWidth,
    height: formHeight,
    weight: formWeight,
    colletAddress: formAddress,
    colletCity: formCity,
    idUserDelivery: formIdentificationD,
    nameUserDelivery: formNameD,
    addressUserDelivery: formAddressD,
    cityUserDelivery: formCityD,
  };

  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const createSend = async () => {
    try {
      if (token) {
        await API.createSend(data, config)
          .then((response) => {
            console.log(response);
            alert("Envío registrado satisfactoriamente")
            setForm(resetData)
          })
          .catch((error) => {
            console.log(error);
            let message =
              typeof error.response !== "undefined"
                ? error.response?.data.messagge
                : error.messagge
                console.log(message);
            if (message.length > 1) {
              alert(message[0].msg);
            } else {
              alert(message);
            }
          });
      } else {
        window.location.href("/");
      }
    } catch (error) {
      if (error.response.data.message == " Error unauthorized") {
        window.location.href = "/login";
      }
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      createSend();
  };

  const resetData = {
    codeSend: "",
    formDate: "",
    formDesc: "",
    formTime: "",
    formLong: "",
    formWidth: "",
    formHeight: "",
    formWeight: "",
    formCity: "",
    formAddress: "",
    formIdentificationD: "",
    formNameD: "",
    formCityD: "",
    formAddressD: "",
  };

  return (
    <>
      <NavbarComponent />
      <Container id="main-container" className="d-grid">
        <Row className="form-container border rounded  px-5 py-2 my-5">
          <form
            id="reg-in-order"
            onSubmit={handleSubmit}
            className="py-3 text-center align-items-center"
            method="POST"
          >
            <div className="py-3">
              <h1 className="form-titulo">Registro de Ordenes</h1>
            </div>
            <div className="row">
              <div className="col">
                <input
                  name="formDate"
                  placeholder="Ingrese la Fecha de Recogida"
                  type="date"
                  className="form-control mb-3"
                  onChange={handleChange}
                  value={formDate}
                />
              </div>
              <div className="col">
                <input
                  name="formTime"
                  placeholder="Ingrese la Hora de Recogida"
                  type="time"
                  className="form-control mb-3"
                  onChange={handleChange}
                  value={formTime}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  name="formLong"
                  placeholder="Largo (cm)"
                  type="number"
                  className="form-control mb-3"
                  onChange={handleChange}
                  value={formLong}
                />
              </div>
              <div className="col">
                <input
                  name="formWidth"
                  placeholder="Ancho (cm)"
                  type="number"
                  className="form-control mb-3"
                  onChange={handleChange}
                  value={formWidth}
                />
              </div>
              <div className="col">
                <input
                  name="formHeight"
                  placeholder="Alto (cm)"
                  type="number"
                  className="form-control mb-3"
                  onChange={handleChange}
                  value={formHeight}
                />
              </div>
              <div className="col">
                <input
                  name="formWeight"
                  placeholder="Peso(lb)"
                  type="number"
                  className="form-control mb-3"
                  onChange={handleChange}
                  value={formWeight}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <input
                      name="codeSend"
                      placeholder="Código de Envío"
                      type="text"
                      className="form-control mb-3"
                      onChange={handleChange}
                      value={codeSend}
                    />
                  </div>
                </div>
                <div className="col">
                  <input
                    name="formDesc"
                    placeholder="Descripcion del Paquete enviado"
                    type="text"
                    className="form-control mb-3"
                    onChange={handleChange}
                    value={formDesc}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      name="formCity"
                      placeholder="Ciudad de Regogida"
                      type="text"
                      className="form-control mb-3"
                      onChange={handleChange}
                      value={formCity}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      name="formAddress"
                      placeholder="Direccion de Regogida"
                      type="text"
                      className="form-control mb-3"
                      onChange={handleChange}
                      value={formAddress}
                    />
                  </div>
                </div>
              </div>
              <div className="col" id="lineaVertical">
                <div className="row">
                  <div className="col">
                    <input
                      name="formIdentificationD"
                      placeholder="Cedula Destinatario"
                      type="text"
                      className="form-control mb-3"
                      onChange={handleChange}
                      value={formIdentificationD}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <input
                      name="formNameD"
                      placeholder="Nombre Destinatario"
                      type="text"
                      className="form-control mb-3"
                      onChange={handleChange}
                      value={formNameD}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      name="formCityD"
                      placeholder="Ciudad de Destino"
                      type="text"
                      className="form-control mb-3"
                      onChange={handleChange}
                      value={formCityD}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      name="formAddressD"
                      placeholder="Direccion de Destino"
                      type="text"
                      className="form-control mb-3"
                      onChange={handleChange}
                      value={formAddressD}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button className="btn btn-create" type="submit">
                  Crear Orden
                </button>
              </div>
              <div className="col">
                <Link className="btn btn-secondary" to={"/sends"}>
                  Volver
                </Link>
              </div>
            </div>
          </form>
        </Row>
      </Container>
    </>
  );
}

export default Regorder;
