import { YobBookproCloseselling } from './YobBookproCloseselling';
import { YobBookproBustrip } from './YobBookproBustrip';
import { YobBookproAgent } from './YobBookproAgent';

export class YobBookproClosesellingdetail {
    id: number;
    yobBookproCloseselling: YobBookproCloseselling;
    yobBookproBustrip: YobBookproBustrip;
    routeName: string;
    paidTickets: number;
    totalPaidTickets: any;
    notPaidTickets: any;
    totalNotPaidTickets:any;
    cancelledTickets: number;
    totalCancelledTickets: any;
    yobBookproAgent: YobBookproAgent;
    agentName: string;
    createDate: Date;
    lastUpdateDate: Date;
}