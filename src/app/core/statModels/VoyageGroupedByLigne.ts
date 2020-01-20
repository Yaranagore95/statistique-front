import {YobBookproOrders} from '../models/YobBookproOrders';

export class VoyageGroupedByLigne {
  ligne: string;
  ligneReservations: YobBookproOrders[];
  nbreVoyage: number;
}
