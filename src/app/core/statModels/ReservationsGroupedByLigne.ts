import {YobBookproOrders} from '../models/YobBookproOrders';

export class ReservationsGroupedByLigne {
  ligne: string;
  confirmedReservations: YobBookproOrders[];
  cancelledReservations: YobBookproOrders[];
}
