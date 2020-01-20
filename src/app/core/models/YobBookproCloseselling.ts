import { YobBookproAgent } from './YobBookproAgent';

export class YobBookproCloseselling {
    id:number;
    closingDate: Date;
    yobBookproAgent: YobBookproAgent;
    firstTicketId: number;
    lastTicketId: number;
    firstDateTime: Date;
    lastDateTime: Date;
    agentName: string;
    createDate: Date;
    lastUpdateDate: Date;
    companyName: string;
}