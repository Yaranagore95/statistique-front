import { YobBookproAgent } from './YobBookproAgent';
import { YobBookproBusSeattemplate } from './YobBookproBusSeattemplate';

export class YobBookproBus {
id: number;
yobBookproAgent: YobBookproAgent;
title: string;
seat: number;
busType:number;
yobBookproBusSeattemplate: YobBookproBusSeattemplate;
upperseattemplateId: number;
desc: Text;
state: number;
image: string;
code: string;
createdBy: number;
modifiedBy: number;
images: Text;
params: Text;


}