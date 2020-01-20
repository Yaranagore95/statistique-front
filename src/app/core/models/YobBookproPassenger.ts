import { YobBookproOrders } from './YobBookproOrders';
import { YobBookproCountry } from './YobBookproCountry';
import { YobBookproCgroup } from './YobBookproCgroup';
import { YobBookproBustrip } from './YobBookproBustrip';

export class YobBookproPassenger{
    id: number;
    title: string;
    firstname: string;
    lastname: string;
    gender: string;
    age: string;
    passport: string;
    ppvalid: Date;
    birthday: Date;
    phone: string;
    shortPhone: string;
    yobBookproOrders: YobBookproOrders;
    yobBookproCountry: YobBookproCountry;
    yobBookproCgroup: YobBookproCgroup
    email: string;
    seat: string;
    returnSeat: string;
    yobBookproBustrip: YobBookproBustrip;
    returnRouteId: number;
    price: number;
    returnPrice: number;
    start: Date;
    returnStart: Date;
    bagQty: number;
    priceBag: number;
    returnBagQty: number;
    returnPriceBag: any;
    paams: Text;
    pnr: string;
    notes: string;
    notesYb: string;
    state: number;
    
}