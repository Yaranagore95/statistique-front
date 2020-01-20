import { YobBookproOrders } from './YobBookproOrders';

export class YobBookproOrdersLog {
    id: number;
    order_id: YobBookproOrders;
    notes: string;
    category: number;
    user_id: number;
    created: Date;
    ip_address: string;
}
