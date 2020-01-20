import { YobBookproCountry } from './YobBookproCountry';
import { YobBookproCgroup } from './YobBookproCgroup';

export class YobBookproCustomer {
    id: number;
    user: number;
    opId: number;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    city: string;
    yobBookproCountry: YobBookproCountry;
    states: string;
    zip: string;
    telephone: string;
    fax: string;
    mobile: string;
    lang: string;
    cardholder: string;
    orther: string;
    created: Date;
    billingAddress: Text;
    birthday: Date;
    state: number;
    checkedOut: number;
    checkedOutTime: Date;
    referralId: number;
    gender: number;
    yobBookproCgroup: YobBookproCgroup;
    params: Text;
    passport: string;
}