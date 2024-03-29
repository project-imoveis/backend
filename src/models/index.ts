import { PropertyModel } from "./PropertyModel";
import { UserModel } from "./UserModel";
import { CorretorModel } from "./CorretorModel";
import { ImobiliariaModel } from "./ImobiliariaModel";
import { NaturalPersonModel } from "./LegalPersonModel";
import { LegalPersonModel } from "./NaturalPersonModel";
import { AddressModel } from "./AddressModel";
import { ImageModel } from "./ImageModel";

export default {
  Property: PropertyModel,
  User: UserModel,
  Address: AddressModel,
  Image: ImageModel,
  Corretor: CorretorModel,
  Imobiliaria: ImobiliariaModel,
  NaturalPerson: NaturalPersonModel,
  LegalPerson: LegalPersonModel,
};
