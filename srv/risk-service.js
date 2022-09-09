const cds = require("@sap/cds")

module.exports = cds.service.impl(async function () {
  //conexión al api hub
  const bupa = await cds.connect.to("API_BUSINESS_PARTNER")

  //leyendo la información contenida en el api hub
  this.on("READ", "Suppliers", async (req) => {
    //al hacer el siguiente paso, se almacena la data en nuestra entidad Suppliers
    return bupa.run(req.query)
  })

  //luego de que se guarde la data en Suppliers
  this.after("READ", "Suppliers", async (req) => {
    const arr = [] //defino un array vacío
    for (let i = 0; i < req.length; i++) { //recorro todos los objetos que tiene Suppliers
      
      const obj = {} //defino un objeto vacío y guardo los datos que necesito y al final agrego dos nuevos
      obj.BusinessPartnerUUID       = req[i].BusinessPartnerUUID
      obj.FirstName                 = req[i].FirstName
      obj.CreationDate              = req[i].CreationDate
      obj.BusinessPartnerFullName   = req[i].BusinessPartnerFullName
      obj.BusinessPartnerName       = req[i].BusinessPartnerName
      obj.ZcatMonotributo           = null
      obj.ZCUIT                     = null

      arr.push(obj) //inserto cada objeto en el array
    }

    try {
      await cds.run(INSERT.into("Extras").entries(arr)) //inserto el array con la data en la la entidad Extras
      console.log("log ------------> Data inserted succesfully into entity")
    } catch (error) {
      console.log("log ------------> Error inserting data into entity")
    }
  })

  //antes de actualizar Extras
  this.before("UPDATE", "Extras", async (req) => {
    const boolCuit  = verifyCuit(req.data.ZCUIT) //recibo un cuit y lo valido utilizando una función para ello
    const zCatMono  = req.data.ZcatMonotributo   //recibo la categoría del monotributo
    let   status    = true                       //defino una variable status true o false para mostrar una respuesta al cargar los datos

    if(req.data.ZCUIT){ //valido que exista el dato
      if (boolCuit == false){ //si la respuesta de la función verifyCuit es false:
          status = false
          req.reject(400, "Invalid Cuit number") //rechazo la petición de update
        }
    }

    if(zCatMono){ //valido que exista el dato
      const zCatUpper = (zCatMono).toUpperCase() //convierto la letra a, b, c, d a mayúscula 
      if (zCatUpper !== "A" && zCatUpper !== "B" && zCatUpper !== "C" && zCatUpper !== "D"){ //si el dato no es A, B, C, D
        status = false
        req.reject(400, "Invalid character") //rechazo la petición de update
      }
    }
    
    status ? console.log("log ------------> Data updated succesfully") : "" //si status es true devuelvo mensaje
  })
  
  function verifyCuit(rCUIT) { //función para validar el cuit
    let aMult = "6789456789"
    aMult = aMult.split("")
    const CUIT = String(rCUIT)
    let iResult = 0
    const aCUIT = CUIT.split("")

    if (aCUIT.length == 11) {
      // La suma de los productos
      for (let i = 0; i <= 9; i++) {
        iResult += aCUIT[i] * aMult[i]
      }
      // El módulo de 11
      iResult = iResult % 11

      // Se compara el resultado con el dígito verificador
      return iResult == aCUIT[10]
    }
    return false
  }
})
