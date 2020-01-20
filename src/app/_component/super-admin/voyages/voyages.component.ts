import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {YobBookproAgent} from '../../../core/models/YobBookproAgent';
import {GlobalSrcService} from '../../../core/services/global-src.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormGroup} from '@angular/forms';
import {YobBookproOrders} from '../../../core/models/YobBookproOrders';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {YobBookproBustrip} from '../../../core/models/YobBookproBustrip';
import {YobBookproBus} from '../../../core/models/YobBookproBus';
import {VoyageService} from '../../../core/services/voyage.service';
import {AgentService} from '../../../core/services/agent.service';
import {BustripService} from '../../../core/services/bustrip.service';

declare let $: any;

@Component({
  selector: 'app-voyages',
  templateUrl: './voyages.component.html',
  styleUrls: ['./voyages.component.scss']
})
export class VoyagesComponent implements OnInit {

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  elements: any = [];
  currentTableValue = [];
  searchText = '';
  previous: string;
  currentStat = 'JJ';
  selectedType = '';
  currentDate: Date;
  currentAgent: YobBookproAgent = new YobBookproAgent();
  globalStat = [];
  btnChangePeriode = true;
  choiceDay = false;
  choiceMonth = false;
  choiceDate = false;
  statForm: FormGroup;
  choiceSub = false;
  // Stat Date var
  date: Date;
  month: string;
  year: string;
  date1: Date;
  date2: Date;
  allCompagnieVente: any[] = [];
  globalData: any[] = [];
  dataTable: any[] = [];
  routes: any[];
  selectedHub = 0;

  tableValues = [];
  tableTotalValues = [];
  successDayStat: boolean;
  successSelectDayStat: boolean;
  successMonthStat: boolean;
  successDateStat: boolean;
  activeVoyage = true;
  activeVente = false;

  // tslint:disable-next-line:max-line-length
  constructor(private globalSrc: VoyageService, private agentService: AgentService, private bustripService: BustripService, private route: ActivatedRoute, private ngxService: NgxSpinnerService, private router: Router, private builder: FormBuilder) {
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.ngxService.show();
    this.currentDate = new Date();
    this.route.params.subscribe(
      () => {
        const id = this.route.snapshot.params.id;
        this.agentService.agent(+id).pipe(first()).subscribe(
          val => {
            this.currentAgent = val;
            this.dataTable = [];
            this.globalData = [];
            this.allCompagnieVente = [];
            this.elements = [];
            this.mdbTable.setDataSource(null);
            this.getDistinctRoutes();
            this.ngxService.hide();
          }, err1 => console.log('erreur agent == ' + err1)
        );
      }
    );
    // this.ngxService.show();
    this.statForm = this.builder.group({
      date: [''],
      month: [''],
      year: [''],
      date1: [''],
      date2: ['']
    });
  }

  selectChangeHandler(event: any) {
    // update the ui
    this.selectedType = event.target.value;
    switch (this.selectedType) {
      case '1':
        this.choiceDay = true;
        this.choiceDate = this.choiceMonth = false;
        // this.currentStat = 'Day';
        break;
      case '2':
        this.choiceMonth = true;
        this.choiceDate = this.choiceDay = false;
        // this.currentStat = 'Month';
        break;
      case '3':
        this.choiceDate = true;
        // this.currentStat = 'Date';
        this.choiceDay = this.choiceMonth = false;
        break;
      default:
        console.log('Choisir');
    }
  }

  get f() {
    return this.statForm.controls;
  }

  subStatForm() {
    this.successSelectDayStat = false;
    this.successMonthStat = false;
    this.successDayStat = false;
    this.successDateStat = false;
    this.choiceSub = true;
    if (!this.formValid()) {
      return;
    }

    if (this.f.date.value !== '') {
      this.successSelectDayStat = false;
      this.successMonthStat = false;
      this.successDayStat = false;
      this.successDateStat = false;
      this.currentStat = 'Day';
      this.tableValues = [];
      this.currentTableValue = [];
      this.dataTable = [];
      this.globalData = [];
      this.allCompagnieVente = [];
      const hubId: number = this.selectedHub;
      const dateInf = '' + this.f.date.value;
      this.successSelectDayStat = false;
      this.globalSrc.oneCompagnieVoyageByDay(+hubId, dateInf, +this.currentAgent.id).subscribe(
        value => {
          if(value !== null) {
            this.allCompagnieVente = value;
            this.getDataValue(value);
            this.successSelectDayStat = true;
          }
        }, err => console.log('Erreur donnée day == ' + err)
      );
    }

    if (this.f.month.value !== '' && this.f.month.value !== '0' && this.f.year.value !== '0' && this.f.year.value !== '') {
      this.successSelectDayStat = false;
      this.successMonthStat = false;
      this.successDayStat = false;
      this.successDateStat = false;
      this.currentStat = 'Month';
      this.globalData = [];
      this.allCompagnieVente = [];
      this.tableValues = [];
      this.currentTableValue = [];
      this.month = VoyagesComponent.returnMonth(+this.f.month.value);
      this.year = this.f.year.value;
      this.successMonthStat = false;
      this.globalSrc.oneCompagnieVoyageByMonth(this.selectedHub, this.currentAgent.id, this.f.year.value, this.f.month.value).subscribe(
        value => {
          if(value !== null) {
            this.allCompagnieVente = value;
            this.getDataValue(value);
            this.successMonthStat = true;
          }
        }, err => console.log('Erreur donnée month == ' + err)
      );
    }

    if (this.f.date1.value !== '' && this.f.date2.value !== '') {
      this.successSelectDayStat = false;
      this.successMonthStat = false;
      this.successDayStat = false;
      this.successDateStat = false;
      this.currentStat = 'Date';
      this.dataTable = [];
      this.globalData = [];
      this.allCompagnieVente = [];
      this.currentTableValue = [];
      this.tableValues = [];
      this.date1 = new Date(this.f.date1.value);
      this.date2 = new Date(this.f.date2.value);
      this.successDateStat = false;
      this.globalSrc.oneCompagnieVoyage(this.selectedHub, this.f.date1.value, this.f.date2.value, this.currentAgent.id).subscribe(
        value => {
          this.allCompagnieVente = value;
          this.getDataValue(value);
          this.successDateStat = true;
        }, err => console.log('Erreur donnée day == ' + err)
      );
    }
  }

  formValid(): boolean {
    // tslint:disable-next-line:max-line-length
    return !(this.f.date.value === '' && this.f.month.value === '' && this.f.year.value === '' && this.f.date1.value === '' && this.f.date2.value === '');
  }

  private static returnMonth(num: number): string {
    if (num === 1) {
      return 'Janvier';
    }
    if (num === 2) {
      return 'Fevrier';
    }
    if (num === 3) {
      return 'Mars';
    }
    if (num === 4) {
      return 'Avril';
    }
    if (num === 5) {
      return 'Mai';
    }
    if (num === 6) {
      return 'Juin';
    }
    if (num === 7) {
      return 'Juillet';
    }
    if (num === 8) {
      return 'Aôut';
    }
    if (num === 9) {
      return 'Septembre';
    }
    if (num === 10) {
      return 'Octobre';
    }
    if (num === 11) {
      return 'Novembre';
    }
    if (num === 12) {
      return 'Decembre';
    }
  }

  getDataValue(allCompagnieVente) {
    if (allCompagnieVente.length === 0){
      this.tableValues = [];
      allCompagnieVente = [];
    }
    this.globalStat = [];
    for (const oneValue of allCompagnieVente) {
      const ligne = oneValue.title;
      const allerOfLigne = [];
      const retourOfLigne = [];
      let sens = 'Aller';
      let totalAller = 0;
      let totalYobAller = 0;
      let totalAgentAller = 0;
      let nbrePassagerAller = 0;
      let nbreVoyageAller = 0;
      let tauxRemplissageAller = 0;
      let tauxReservationAller = 0;
      let compteur = 0;
      const valuesAller = [];
      const valuesRetour = [];
      const totalPassagerAller = [];
      const totalPlaceAller = [];
      const totalVoyageAller = [];
      for (const oneArriveLigne of  oneValue.lignesArrive) {
        const oneLineOfOneArrive: YobBookproBustrip = oneArriveLigne.ligne;
        const reservationOfOneLigneOfOneArrive: YobBookproOrders[] = oneArriveLigne.ligneReservations;
        const values = VoyagesComponent.getValueByOrders(reservationOfOneLigneOfOneArrive);
        totalPassagerAller.push(values[3]);
        totalPlaceAller.push(values[7]);
        totalVoyageAller.push(values[4]);
        // Pour les valeurs totales Aller
        totalAller += values[0];
        totalYobAller += values[1];
        totalAgentAller += values[2];
        nbrePassagerAller += values[3];
        nbreVoyageAller += values[4];
        tauxRemplissageAller += values[5];
        tauxReservationAller += values[6];
        compteur++;
        // Les valeus pour chaque Aller
        const heureLigneAller = oneLineOfOneArrive.startTime;
        const totalLigneAller = values[0];
        const totalYobLigneAller = values[1];
        const totalAgentLigneAller = values[2];
        const nbrePassagerLigneAller = values[3];
        const nbreVoyageLigneAller = values[4];
        // Taux par 100
        const tauxRemplissageLigneAller = values[5] * 100;
        const tauxReservationLigneAller = values[6];
        const destination = oneLineOfOneArrive.title;
        if (nbrePassagerLigneAller !== 0 && nbreVoyageLigneAller !== 0) {
          valuesAller.push({
            heureLigneAller,
            totalLigneAller,
            totalYobLigneAller,
            totalAgentLigneAller,
            nbrePassagerLigneAller,
            nbreVoyageLigneAller,
            tauxRemplissageLigneAller,
            tauxReservationLigneAller,
            destination
          });
        }
      }
      let totalSommePassager = 0;
      let totalDenom = 0;
      // for (let data of t)
      for (let i = 0; i < totalPlaceAller.length; i++) {
        totalSommePassager += totalPassagerAller[i];
        totalDenom += (totalPlaceAller[i] * totalVoyageAller[i]);
      }

      tauxReservationAller = (tauxReservationAller / compteur);
      tauxRemplissageAller = (totalSommePassager / totalDenom) * 100;

      console.log('DEBUG VALEUR ::: passager ' + totalPassagerAller.length + ' voyage ' +totalVoyageAller.length + ' place ' + totalPlaceAller.length);

      const totalValueAller = [];
      valuesAller.sort((a, b) => (a.heureLigneAller > b.heureLigneAller) ? 1 : -1);
      totalValueAller.push({
        sens,
        totalAller,
        totalYobAller,
        totalAgentAller,
        nbrePassagerAller,
        nbreVoyageAller,
        tauxRemplissageAller,
        tauxReservationAller
      });
      allerOfLigne.push({
        totalValueAller,
        valuesAller
      });
      allerOfLigne.sort((a, b) => (a.valuesAller.heure > b.valuesAller.heure) ? 1 : -1);
      sens = 'Retour';
      let totalRetour = 0;
      let totalYobRetour = 0;
      let totalAgentRetour = 0;
      let nbrePassagerRetour = 0;
      let nbreVoyageRetour = 0;
      let tauxRemplissageRetour = 0;
      let tauxReservationRetour = 0;
      compteur = 0;
      const totalPassagerRetour = [];
      const totalPlaceRetour = [];
      const totalVoyageRetour = [];
      for (const oneRetourLigne of  oneValue.lignesDepart) {
        const oneLineOfOneRetour: YobBookproBustrip = oneRetourLigne.ligne;
        const reservationOfOneLigneOfOneRetour: YobBookproOrders[] = oneRetourLigne.ligneReservations;
        const values = VoyagesComponent.getValueByOrders(reservationOfOneLigneOfOneRetour);
        // Pour les valeurs totales Aller
        // @ts-ignore
        totalPassagerRetour.push(values[3]);
        totalPlaceRetour.push(values[7]);
        totalVoyageRetour.push(values[4]);
        totalRetour += values[0];
        totalYobRetour += values[1];
        totalAgentRetour += values[2];
        nbrePassagerRetour += values[3];
        nbreVoyageRetour += values[4];
        tauxRemplissageRetour += values[5];
        tauxReservationRetour += values[6];
        compteur++;
        // Les valeus pour chaque Retour
        const heureLigneRetour = oneLineOfOneRetour.startTime;
        const totalLigneRetour = values[0];
        const totalYobLigneRetour = values[1];
        const totalAgentLigneRetour = values[2];
        const nbrePassagerLigneRetour = values[3];
        const nbreVoyageLigneRetour = values[4];
        const tauxRemplissageLigneRetour = values[5] * 100;
        const tauxReservationLigneRetour = values[6];
        const destination = oneLineOfOneRetour.title;
        if (nbrePassagerLigneRetour !== 0 && nbreVoyageLigneRetour !== 0) {
          valuesRetour.push({
            heureLigneRetour,
            totalLigneRetour,
            totalYobLigneRetour,
            totalAgentLigneRetour,
            nbrePassagerLigneRetour,
            nbreVoyageLigneRetour,
            tauxRemplissageLigneRetour,
            tauxReservationLigneRetour,
            destination
          });
        }
      }

      totalSommePassager = 0;
      totalDenom = 0;
      for (let i = 0; i < totalPlaceRetour.length; i++) {
        totalSommePassager += totalPassagerRetour[i];
        totalDenom += (totalPlaceRetour[i] * totalVoyageRetour[i]);
      }
      tauxReservationRetour = (tauxReservationRetour / compteur);
      tauxRemplissageRetour = (totalSommePassager / totalDenom) * 100 ;
      console.log('DEBUG POUR RETOUR ' + ligne + ' ::: PASSAGER == ' + totalSommePassager + ' DENOM == ' + totalDenom);
      const totalValueRetour = [];
      valuesRetour.sort((a, b) => (a.heureLigneRetour > b.heureLigneRetour) ? 1 : -1);
      totalValueRetour.push({
        sens,
        totalRetour,
        totalYobRetour,
        totalAgentRetour,
        nbrePassagerRetour,
        nbreVoyageRetour,
        tauxRemplissageRetour,
        tauxReservationRetour
      });
      retourOfLigne.push({
        totalValueRetour,
        valuesRetour
      });
      retourOfLigne.sort((a, b) => (a.valuesRetour.heure > b.valuesRetour.heure) ? 1 : -1);
      const values = VoyagesComponent.getLigneTotal(allerOfLigne, retourOfLigne);
      const totalRoute = values[0];
      const totalYobRoute = values[1];
      const totalAgentRoute = values[2];
      const nbrePassagerRoute = values[3];
      const nbreVoyageRoute = values[4];
      //const tauxRemplissageRoute = values[5];
      const tauxReservationRoute = values[6];
      totalSommePassager = 0;
      totalDenom = 0;
      console.log('DEBUG ALLER POUR :: ' + ligne);
      for (let i = 0; i < totalPlaceAller.length; i++) {
        totalSommePassager += totalPassagerAller[i];
        console.log('DEBUG :: PLACE == ' + totalPlaceAller[i]);
        console.log('DEBUG :: PASSAGER == ' + totalPassagerAller[i]);
        console.log('DEBUG :: VOYAGE == ' + totalVoyageAller[i]);
        totalDenom += (totalPlaceAller[i] * totalVoyageAller[i]);
      }
      console.log('DEBUG RETOUR POUR :: ' + ligne);
      for (let i = 0; i < totalPlaceRetour.length; i++) {
        console.log('DEBUG :: PLACE == ' + totalPlaceRetour[i]);
        console.log('DEBUG :: PASSAGER == ' + totalPassagerRetour[i]);
        console.log('DEBUG :: VOYAGE == ' + totalVoyageRetour[i]);
        totalSommePassager += totalPassagerRetour[i];
        totalDenom += (totalPlaceRetour[i] * totalVoyageRetour[i]);
      }

      const tauxRemplissageRoute = (totalSommePassager / totalDenom) * 100;

      console.log('DEGUG TOTAL POUR ' + ligne + ' TOTAL PASSAGER :: ' + totalSommePassager + ' DENOM :: ' + totalDenom);

      const totalValueRoute = [];
      totalValueRoute.push({
        ligne,
        totalRoute,
        totalYobRoute,
        totalAgentRoute,
        nbrePassagerRoute,
        nbreVoyageRoute,
        tauxRemplissageRoute,
        tauxReservationRoute
      });
      this.globalStat.push({
        totalValueRoute,
        allerOfLigne,
        retourOfLigne
      });
    }
    // this.dataTable
    for (let values of this.globalStat) {
      const routeLigne = values.totalValueRoute[0].ligne;
      const routeTotal = values.totalValueRoute[0].totalRoute;
      const routeTotalYob = values.totalValueRoute[0].totalYobRoute;
      const routeTotalAgent = values.totalValueRoute[0].totalAgentRoute;
      const routeNbrePassager = values.totalValueRoute[0].nbrePassagerRoute;
      const routeNbreVoyage = values.totalValueRoute[0].nbreVoyageRoute;
      const routeTauxRemplissage = values.totalValueRoute[0].tauxRemplissageRoute;
      const routeTauxReservation = values.totalValueRoute[0].tauxReservationRoute;
      let sensAller = '';
      let totalAller = 0;
      let totalYobAller = 0;
      let totalAgentAller = 0;
      let nbrePassagerAller = 0;
      let nbreVoyageAller = 0;
      let tauxRemplissageAller = 0;
      let tauxReservationAller = 0;
      const listOfLigneAller = [];
      for (let aller of values.allerOfLigne) {
        sensAller = aller.totalValueAller[0].sens;
        totalAller = aller.totalValueAller[0].totalAller;
        totalYobAller = aller.totalValueAller[0].totalYobAller;
        totalAgentAller = aller.totalValueAller[0].totalAgentAller;
        nbrePassagerAller = aller.totalValueAller[0].nbrePassagerAller;
        nbreVoyageAller = aller.totalValueAller[0].nbreVoyageAller;
        tauxRemplissageAller = aller.totalValueAller[0].tauxRemplissageAller;
        tauxReservationAller = aller.totalValueAller[0].tauxReservationAller;
        if (aller.valuesAller.length != 0) {
          for (let oneAller of aller.valuesAller) {
            const heureLigne = oneAller.heureLigneAller;
            const totalLigne = oneAller.totalLigneAller;
            const totalYobLigne = oneAller.totalYobLigneAller;
            const totalAgentLigne = oneAller.totalAgentLigneAller;
            const nbrePassagerLigne = oneAller.nbrePassagerLigneAller;
            const nbreVoyageLigne = oneAller.nbreVoyageLigneAller;
            const tauxRemplissageLigne = oneAller.tauxRemplissageLigneAller;
            const tauxReservationLigne = oneAller.tauxReservationLigneAller;
            const destinationLigne = oneAller.destination;
            listOfLigneAller.push({
              heureLigne,
              totalLigne,
              totalYobLigne,
              totalAgentLigne,
              nbrePassagerLigne,
              nbreVoyageLigne,
              tauxRemplissageLigne,
              tauxReservationLigne,
              destinationLigne
            });
          }
        }
      }
      let sensRetour = '';
      let totalRetour = 0;
      let totalYobRetour = 0;
      let totalAgentRetour = 0;
      let nbrePassagerRetour = 0;
      let nbreVoyageRetour = 0;
      let tauxRemplissageRetour = 0;
      let tauxReservationRetour = 0;
      const listOfLigneRetour = [];
      for (let retour of values.retourOfLigne) {
        sensRetour = retour.totalValueRetour[0].sens;
        totalRetour = retour.totalValueRetour[0].totalRetour;
        totalYobRetour = retour.totalValueRetour[0].totalYobRetour;
        totalAgentRetour = retour.totalValueRetour[0].totalAgentRetour;
        nbrePassagerRetour = retour.totalValueRetour[0].nbrePassagerRetour;
        nbreVoyageRetour = retour.totalValueRetour[0].nbreVoyageRetour;
        tauxRemplissageRetour = retour.totalValueRetour[0].tauxRemplissageRetour;
        tauxReservationRetour = retour.totalValueRetour[0].tauxReservationRetour;

        if (retour.valuesRetour.length != 0) {
          for (let oneAller of retour.valuesRetour) {
            const heureLigne = oneAller.heureLigneRetour;
            const totalLigne = oneAller.totalLigneRetour;
            const totalYobLigne = oneAller.totalYobLigneRetour;
            const totalAgentLigne = oneAller.totalAgentLigneRetour;
            const nbrePassagerLigne = oneAller.nbrePassagerLigneRetour;
            const nbreVoyageLigne = oneAller.nbreVoyageLigneRetour;
            const tauxRemplissageLigne = oneAller.tauxRemplissageLigneRetour;
            const tauxReservationLigne = oneAller.tauxReservationLigneRetour;
            const destinationLigne = oneAller.destination;
            listOfLigneRetour.push({
              heureLigne,
              totalLigne,
              totalYobLigne,
              totalAgentLigne,
              nbrePassagerLigne,
              nbreVoyageLigne,
              tauxRemplissageLigne,
              tauxReservationLigne,
              destinationLigne
            });
          }
        }
      }
      this.tableValues.push({
        'Route': {
          routeLigne,
          routeTotal,
          routeTotalYob,
          routeTotalAgent,
          routeNbrePassager,
          routeNbreVoyage,
          routeTauxRemplissage,
          routeTauxReservation
        },
        'Aller': {
          sensAller: sensAller,
          totalAller: totalAller,
          totalYobAller: totalYobAller,
          totalAgentAller: totalAgentAller,
          nbrePassagerAller: nbrePassagerAller,
          nbreVoyageAller: nbreVoyageAller,
          tauxRemplissageAller: tauxRemplissageAller,
          tauxReservationAller: tauxReservationAller
        },
        'ValeurAller': listOfLigneAller,
        'Retour': {
          sensRetour: sensRetour,
          totalRetour: totalRetour,
          totalYobRetour: totalYobRetour,
          totalAgentRetour: totalAgentRetour,
          nbrePassagerRetour: nbrePassagerRetour,
          nbreVoyageRetour: nbreVoyageRetour,
          tauxRemplissageRetour: tauxRemplissageRetour,
          tauxReservationRetour: tauxReservationRetour
        },
        'ValeurRetour': listOfLigneRetour
      });
    }
    this.currentTableValue = this.tableValues;
    this.getTotalValues(this.tableValues);
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  getDistinctRoutes() {
    this.bustripService.distinctRoutesByAgent(0, this.currentAgent.id).subscribe(
      value => {
        this.routes = value;
        this.routes.sort((a, b) => (a.numero > b.numero) ? 1 : -1);
      }
      , err => console.log('erreur distinct route == ' + err)
    );
  }

  selectChangeHandlerHub(event: any) {
    this.selectedHub = event.target.value;
    this.tableValues = [];
    this.globalStat = [];
    if (event.target.value !== 0) {
      $('#exampleModalCenter').modal('hide');
    }
    // console.log('DEBUG SEARCH :: '+ this.searchText);
  }

  setting() {
    $('#exampleModalCenter').modal('show');
  }

  private static getLigneTotal(allerOfLigne, retourOfLigne): any[] {
    let nbrePassager = 0;
    let nbreVoyage = 0;
    let total = 0;
    let totalYob = 0;
    let totalAgent = 0;
    let totalTaux = 0;
    let totalTauxRemplissage = 0;
    let cpt = 0;
    if (allerOfLigne.length != 0) {
      for (let values of allerOfLigne) {
        if (values.totalValueAller[0].nbreVoyageAller !== 0 && values.totalValueAller[0].nbrePassagerAller !== 0) {
          cpt++;
          total += values.totalValueAller[0].totalAller;
          totalYob += values.totalValueAller[0].totalYobAller;
          totalAgent += values.totalValueAller[0].totalAgentAller;
          nbreVoyage += values.totalValueAller[0].nbreVoyageAller;
          nbrePassager += values.totalValueAller[0].nbrePassagerAller;
          totalTaux += values.totalValueAller[0].tauxRemplissageAller;
          totalTauxRemplissage += values.totalValueAller[0].tauxReservationAller;
        }
      }
    }
    if (retourOfLigne.length != 0) {
      for (let values of retourOfLigne) {
        if (values.totalValueRetour[0].nbreVoyageRetour !== 0 && values.totalValueRetour[0].nbrePassagerRetour) {
          cpt++;
          total += values.totalValueRetour[0].totalRetour;
          totalYob += values.totalValueRetour[0].totalYobRetour;
          totalAgent += values.totalValueRetour[0].totalAgentRetour;
          nbreVoyage += values.totalValueRetour[0].nbreVoyageRetour;
          nbrePassager += values.totalValueRetour[0].nbrePassagerRetour;
          totalTaux += values.totalValueRetour[0].tauxRemplissageRetour;
          totalTauxRemplissage += values.totalValueRetour[0].tauxReservationRetour;
        }
      }
    }
    return [total, totalYob, totalAgent, nbrePassager, nbreVoyage, (totalTaux / cpt), (totalTauxRemplissage / cpt)];
  }

  private static getValueByOrders(lignesReservations: YobBookproOrders[]): any[] {
    const distinctVoyage = [];
    const distinctBus = [];
    let nbrePassager = 0;
    let nbrePlace = 0;
    let total = 0;
    let totalYob = 0;
    let totalAgent = 0;
    let cptReservation = 0;
    for (const order of lignesReservations) {
      total += order.total;
      if (order.payMethod.toLowerCase() === 'agent') {
        totalAgent += order.total;
      } else {
        totalYob += order.total;
      }
      for (const passenger of order.yobBookproPassengers) {
        nbrePassager++;

        const created = new Date(order.created);
        created.setHours(0);
        created.setMinutes(0);
        created.setSeconds(0);

        // console.log('DEBUG VAL ORDER :: '+ created.getTime());
        // const val2 = ''+ order.created;
        // console.log('DEBUG VAL START :: '+ new Date(passenger.start).getTime());

        if (new Date(passenger.start).getTime() !== created.getTime()) {
          cptReservation++;
        }
      }
      if (distinctVoyage.indexOf(order.start) === -1) {
        distinctVoyage.push(order.start);
        distinctBus.push(order.yobBookproBustrip.yobBookproBus);
      }
    }
    // @ts-ignore
    for (const bus: YobBookproBus of distinctBus) {
      nbrePlace += bus.seat;
    }
    return [total, totalYob, totalAgent, nbrePassager, distinctVoyage.length, ((nbrePassager) / (nbrePlace)), (cptReservation / nbrePassager) * 100, nbrePlace];
  }

  selectFound(event: any) {
    this.filterData(event.target.value);
  }

  filterData(ligneFilter: string) {
    const currentValues = [];
    if (ligneFilter == 'all') {
      this.tableValues = this.currentTableValue;
    }
    for (const data of this.currentTableValue) {
      if (data.Route.routeLigne === ligneFilter) {
        currentValues.push({
          'Route': data.Route,
          'ValeurAller': data.ValeurAller,
          'Aller': data.Aller,
          'ValeurRetour': data.ValeurRetour,
          'Retour': data.Retour
        });
        this.tableValues = currentValues;
      }
    }
  }

  getTotalValues(tableValues) {
    this.tableTotalValues = [];
    let cpt = 0;
    let total = 0;
    let totalYob = 0;
    let totalAgent = 0;
    let nbrePassager = 0;
    let nbreVoyage = 0;
    let tauxRemplissage = 0;
    let tauxReservation = 0;
    for (const values of tableValues) {
      total += values.Route.routeTotal;
      totalYob += values.Route.routeTotalYob;
      totalAgent += values.Route.routeTotalAgent;
      nbrePassager += values.Route.routeNbrePassager;
      nbreVoyage += values.Route.routeNbreVoyage;
      tauxRemplissage += values.Route.routeTauxRemplissage;
      tauxReservation += values.Route.routeTauxReservation;
      cpt ++;
    }

    tauxReservation = (tauxReservation / cpt);
    tauxRemplissage = (tauxRemplissage / cpt);

    this.tableTotalValues.push({
      total,totalYob, totalAgent, nbrePassager, nbreVoyage, tauxRemplissage, tauxReservation
    })
  }
}
