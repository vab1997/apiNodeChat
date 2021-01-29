const express = require("express")
const multer = require("multer")

const response = require("../../network/response")
const controller = require("./controller")
const router = express.Router()

const upload = multer({
  dest: "public/files/",
})

router.get("/", function (req, res) {
  const filterUser = req.query.user || null
  controller
    .getMessages(filterUser)
    .then((messagesList) => {
      response.success(req, res, messagesList, 200)
    })
    .catch((e) => {
      response.error(req, res, "Unexpected error", 500, e)
    })
})

router.post("/", upload.single("file"), function (req, res) {
  console.log(req.file)

  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((message) => {
      response.success(req, res, message, 201)
    })
    .catch((e) => {
      response.error(
        req,
        res,
        "error inesperado",
        400,
        "Error en el controlador"
      )
    })
})

router.patch("/:id", function (req, res) {
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((message) => {
      response.success(req, res, message, 200)
    })
    .catch((e) => {
      response.error(req, res, "Error interno", 500, e)
    })
})

router.delete("/:id", function (req, res) {
  controller
    .deleteMessage(req.params.id)
    .then(() => {
      response.success(
        req,
        res,
        `Mensaje con id: ${req.params.id} eliminado`,
        200
      )
    })
    .catch((e) => {
      response.error(req, res, "Error interno", 500, e)
    })
})

module.exports = router
