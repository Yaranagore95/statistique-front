import { YobBookproOrders } from './YobBookproOrders';

export class YobBookproOrderRequest {
    id: number;
    yobBookproOrders: YobBookproOrders;
    type: number;
    orderStatus: string;
    status: number;
    payStatus: string
    notes: string;
    userId: number;
    ipAddress: string;
    createdBy: number;
    created: Date;

}
