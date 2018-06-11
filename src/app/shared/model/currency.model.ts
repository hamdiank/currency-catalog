import { AttributesModel } from "./attributes.model";

export class CurrencyModel {
    id: string;
    attributes: AttributesModel;

    constructor(currency: any) {
        this.id = currency.id;
        this.attributes = new AttributesModel(currency.attributes);
      }
}