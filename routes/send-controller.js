const { Router } = require("express");
const { validationResult, check } = require("express-validator");
const { jwtValidate } = require("../middlewares/jwt-validator");
const session = require("express-session");

const Send = require("../model/Send");

const router = Router();

// Get all sends
router.get("/", [jwtValidate], async function (req, res) {
  console.log(req.session.user?.email);
  try {
    const sends = await Send.find();
    res.send(sends);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error internal server" });
  }
});

// Get Send by Id
router.get("/edit/:id", [jwtValidate], async function (req, res) {
  try {
    const { id } = req.params;
    const response = await Send.findById({ _id: id });

    console.log("GEt/send/", id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error internal server" });
  }
});

// Get sends in delivery status
router.get("/dev", [jwtValidate], async function (req, res) {
  try {
    console.log(req.session.user?.email);
    const sends = await Send.find({ userLogin: req.session.user?.email });
    res.send(sends);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error internal server" });
  }
});

// Create send methos
router.post(
  "/create",
  [
    check("codeSend", "Sedn Code is require").not().isEmpty(),
    check("description", "Description is require").not().isEmpty(),
    check("dateSend", "Date send is require").not().isEmpty(),
    check("hourSend", "Hour send is require").not().isEmpty(),
    /* check("status", "Status is require").not().isEmpty(),
    check("status", "Status format invalid").isIn([
      "ENVIADO",
      "ENTREGADO",
      "EN CAMINO",
      "EN BODEGA",
    ]), */
    check("large", "large size is require").not().isEmpty(),
    check("width", "Width size is require").not().isEmpty(),
    check("height", "Height size is require").not().isEmpty(),
    check("weight", "weight size is require").not().isEmpty(),
    check("colletAddress", "Addres from collect is require").not().isEmpty(),
    check("colletCity", "City from collect is require").not().isEmpty(),
    check("idUserDelivery", "Identification of user delivery is require")
      .not()
      .isEmpty(),
    check("nameUserDelivery", "Name of user delivery is require")
      .not()
      .isEmpty(),
    check("addressUserDelivery", "Address of user delivery is require")
      .not()
      .isEmpty(),
    check("cityUserDelivery", "City of user delivery is require")
      .not()
      .isEmpty(),
    jwtValidate,
  ],
  async function (req, res) {
    console.log(req.body);
    console.log(req.session.id);
    try {
      // Validate inputs required
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ messagge: errors.array() });
      }

      //Validate that send no exists
      const sendFinded = await Send.findOne({ codeSend: req.body.codeSend });
      if (sendFinded) {
        return res.status(400).json({ messagge: "The Send is alredy exists" });
      }

      let send = new Send();

      send.userLogin = req.session.username;
      send.codeSend = req.body.codeSend;
      send.description = req.body.description;
      send.dateSend = req.body.dateSend;
      send.hourSend = req.body.hourSend;
      send.status = req.body.status || "EN BODEGA";
      send.large = req.body.large;
      send.width = req.body.width;
      send.height = req.body.height;
      send.weight = req.body.weight;
      send.colletAddress = req.body.colletAddress;
      send.colletCity = req.body.colletCity;
      send.idUserDelivery = req.body.idUserDelivery;
      send.nameUserDelivery = req.body.nameUserDelivery;
      send.addressUserDelivery = req.body.addressUserDelivery;
      send.cityUserDelivery = req.body.cityUserDelivery;

      send = await send.save();

      res.send(send);
    } catch (error) {
      console.log(error);
      res.status(500).json({ messagge: "Internal Server Error!" });
    }
  }
);

//Update method
router.put(
  "/update/:id",
  [
    check("codeSend", "Send Code is required").not().isEmpty(),
    check("status", "Status is require").not().isEmpty(),
    check("status", "Status format invalid").isIn([
      "ENVIADO",
      "ENTREGADO",
      "EN CAMINO",
      "EN BODEGA",
    ]),
    check("colletAddress", "Addres from collect is require").not().isEmpty(),
    check("colletCity", "City from collect is require").not().isEmpty(),
    check("idUserDelivery", "Identification of user delivery is require")
      .not()
      .isEmpty(),
    check("nameUserDelivery", "Name of user delivery is require")
      .not()
      .isEmpty(),
    check("addressUserDelivery", "Address of user delivery is require")
      .not()
      .isEmpty(),
    check("cityUserDelivery", "City of user delivery is require")
      .not()
      .isEmpty(),
    jwtValidate,
  ],
  async function (req, res) {
    console.log("PUT: ", req.params.id);

    try {
      const { id } = req.params;

      let send = await Send.findById({ _id: id });
      if (!send) {
        return res.status(404).json({ msj: "Not found" });
      }

      const {
        codeSend,
        status,
        colletAddress,
        colletCity,
        idUserDelivery,
        nameUserDelivery,
        addressUserDelivery,
        cityUserDelivery,
      } = req.body;

      const sendExists = await Send.findOne({
        codeSend: codeSend,
        _id: { $ne: id },
      });
      if (sendExists) {
        return res.status(500).json({ mjs: "The send is already exists" });
      }

      send.codeSend = codeSend;
      send.description = send.description;
      send.dateSend = send.dateSend;
      send.hourSend = send.hourSend;
      send.status = status;
      send.large = send.large;
      send.width = send.width;
      send.height = send.height;
      send.weight = send.weight;
      send.colletAddress = colletAddress;
      send.colletCity = colletCity;
      send.idUserDelivery = idUserDelivery;
      send.nameUserDelivery = nameUserDelivery;
      send.addressUserDelivery = addressUserDelivery;
      send.cityUserDelivery = cityUserDelivery;

      send = await send.save();

      res.status(202).json(send);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ msj: error.message })
        .send("Internal Server error", error.message);
    }
  }
);

// Delete method by id
router.delete("/:id", [jwtValidate], async function (req, res) {
  try {
    console.log("DELETE: ", req.params.id);
    const { id } = req.params;

    const sendDelete = await Send.findById({ _id: id });
    if (!sendDelete) {
      return res.status(400).json({ messagge: "The send is not found" });
    }

    const response = await sendDelete.remove();

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messagge: "Internal Server Error!" });
  }
});

module.exports = router;
