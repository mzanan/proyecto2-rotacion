using {bHub as my} from '../db/schema';

//expongo las entidades a través de un servicio
service RiskService {
  entity Suppliers as projection on my.Suppliers;
  entity Extras as projection on my.Extras;
}
