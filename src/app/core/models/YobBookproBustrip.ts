import { YobBookproAgent } from './YobBookproAgent';
import { Time } from '@angular/common';
import { YobBookproBus } from './YobBookproBus';

export class YobBookproBustrip {
    id: number;
    access: number;
    parentId:number;
    lft: number;
    rgt: number;
    level: number;
    path: string;
    route: string;
    from: number;
    to: number;
    yobBookproAgent: YobBookproAgent;
    startTime: Time;
    endTime: Time;
    code: string;
    yobBookproBus: YobBookproBus;
    state: number;
    ordering: number;
    publishDate: Date;
    unpublishDate: Date;
    duration:string;
    seats: string;
    door:number;
    createdBy: number;
    modifiedBy: number;
    dropDoor: number;
    params: Text;
    driverId: number;
    title: string;
    policy: Text;


}