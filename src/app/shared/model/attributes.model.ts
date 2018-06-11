export class AttributesModel {
    code: string;
    name: string;
    currency_type: string;
    code_iso_numeric3: string;
    code_iso_alpha3: string;
    symbol: string;
    native_symbol: string;
    decimal_e: number;
    category: string;

    constructor(attributes:any) {
        this.code=attributes.code;
        this.name=attributes.name;
        this.currency_type=attributes.currency_type;
        this.code_iso_numeric3=attributes.code_iso_numeric3;
        this.code_iso_alpha3=attributes.code_iso_alpha3;
        this.native_symbol=attributes.native_symbol;
        this.decimal_e=attributes.decimal_e;
        this.category=attributes.category;
    }



}