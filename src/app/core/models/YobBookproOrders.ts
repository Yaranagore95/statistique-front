import { YobBookproCoupon } from './YobbookproCoupon';
import { YobBookproCurrency } from './YobBookproCurrency';
import { YobBookproBustrip } from './YobBookproBustrip';
import {YobBookproPassenger} from './YobBookproPassenger';

export class YobBookproOrders {

    id: number;
    type: string;
    userId: number;
    orderNumber: string;
    total: any;
    totalBag: any;
    subtotal: any;
    payMethod: string;
    payStatus: string;
    discount: any;
    currency: string;
    state: number;
    notes: string;
    notesYb: string;
    ipAddress: string;
    created: Date;
    tax: string;
    service_fee: string;
    orderStatus: string;
    yobBookproCoupon: YobBookproCoupon;
    txId: string;
    params: Text;
    deposit: any;
    yobBookproCurrency: YobBookproCurrency;
    refundDate: Date;
    seat: string;
    returnSeat: string;
    start: Date;
    returnStart: Date;
    yobBookproBustrip: YobBookproBustrip;
    returnRouteId: number;
    createdBy: number;
  yobBookproPassengers: YobBookproPassenger[];


}
