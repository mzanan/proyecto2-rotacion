//importación necesaria para utilizar funciones sap
const cds = require("@sap/cds")

//importación de swagger
const cdsSwagger = require("cds-swagger-ui-express")

//módulo principal que se ejecuta antes de que se pongan en funcinamiento los servicios.
cds.on("bootstrap", app => {
  app.use(
    cdsSwagger({
      basePath: "/swagger"
      //diagram: false,
    })
  )
})
module.exports = cds.server
