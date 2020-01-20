import { Component, OnInit } from '@angular/core';
import { YobBookproAgent } from '../../../core/models/YobBookproAgent';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { YobBookproBustrip } from '../../../core/models/YobBookproBustrip';
import { YobBookproOrders } from '../../../core/models/YobBookproOrders';
import { YobBookproBus } from '../../../core/models/YobBookproBus';
import { VenteService } from '../../../core/services/vente.service';
import { VoyageService } from '../../../core/services/voyage.service';
import { BustripService } from '../../../core/services/bustrip.service';
import { AuthService } from '../../../core/services/auth.service';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentTableValue = [];
  currentStat = 'JJ';
  selectedType = '';
  selectedTypeCompare = '';
  currentDate: Date;
  currentAgent: YobBookproAgent = new YobBookproAgent();
  globalStat = [];
  choiceDay = false;
  choiceDayCompare = false;
  choiceMonth = false;
  choiceMonthCompare = false;
  choiceDate = false;
  choiceDateCompare = false;
  statForm: FormGroup;
  statFormCompare: FormGroup;
  choiceSub = false;
  // Stat Date var
  date: Date;
  month: string;
  year: string;
  date1: Date;
  date2: Date;
  allCompagnieVente: any[] = [];
  globalData: any[] = [];
  routes: any[];
  selectedHub = 0;
  tableValues = [];
  tableTotalValues = [];
  activeVoyage = true;
  activeVente = false;
  compareDate = '';
  subFormCompare = false;
  currentStatValues = [];
  allCurrentStatValues = [];
  currentCompareStatValues = [];
  allCurrentCompareStatValues = [];
  differencesCompareValues = [];
  statValuesCompare = [];

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private venteService: VenteService, private voyageService: VoyageService,
    private builder: FormBuilder, private bustripService: BustripService, private authSrc: AuthService) {
  }

  get f() {
    return this.statForm.controls;
  }

  get fCompare() {
    return this.statFormCompare.controls;
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
    if (allerOfLigne.length !== 0) {
      for (const values of allerOfLigne) {
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
    if (retourOfLigne.length !== 0) {
      for (const values of retourOfLigne) {
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
    // tslint:disable-next-line: max-line-length
    return [total, totalYob, totalAgent, nbrePassager, distinctVoyage.length, ((nbrePassager) / (nbrePlace)), (cptReservation / nbrePassager) * 100, nbrePlace];
  }

  private static getTotalValues(tableValues): any[] {
    const tableTotalValues = [];
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
      cpt++;
    }
    tauxReservation = (tauxReservation / cpt);
    tauxRemplissage = (tauxRemplissage / cpt);

    tableTotalValues.push({
      total, totalYob, totalAgent, nbrePassager, nbreVoyage, tauxRemplissage, tauxReservation
    });
    return tableTotalValues;
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

  ngOnInit() {

    if (this.authSrc.currentUserValue) {
      this.currentAgent = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.getDistinctRoutes();
    this.currentDate = new Date();

    this.statForm = this.builder.group({
      date: [''],
      month: [''],
      year: [''],
      date1: [''],
      date2: [''],
    });

    this.statFormCompare = this.builder.group({
      date: [''],
      compareDate: [''],
      month: [''],
      compareMonth: [''],
      year: [''],
      compareYear: [''],
      date1: [''],
      compareDate1: [''],
      date2: [''],
      compareDate2: ['']
    });
  }

  handlerStat(event: any) {
    if (event.target.value === '1') {
      this.tableValues = [];
      this.globalStat = [];
      this.tableTotalValues = [];
      this.activeVoyage = true;
      this.activeVente = false;
    }
    if (event.target.value === '2') {
      this.tableValues = [];
      this.tableTotalValues = [];
      this.globalStat = [];
      this.activeVente = true;
      this.activeVoyage = false;
    }
  }

  selectChangeSat(event: any) {
    this.selectedType = event.target.value;
    switch (this.selectedType) {
      case '1':
        this.choiceDay = true;
        this.choiceDate = this.choiceMonth = false;
        break;
      case '2':
        this.choiceMonth = true;
        this.choiceDate = this.choiceDay = false;
        break;
      case '3':
        this.choiceDate = true;
        this.choiceDay = this.choiceMonth = false;
        break;
      default:
        console.log('Choisir');
    }
  }

  selectChangeSatCompare(event: any) {
    this.selectedTypeCompare = event.target.value;
    switch (this.selectedTypeCompare) {
      case '1':
        this.choiceDayCompare = true;
        this.choiceDateCompare = this.choiceMonthCompare = false;
        break;
      case '2':
        this.choiceMonthCompare = true;
        this.choiceDateCompare = this.choiceDayCompare = false;
        break;
      case '3':
        this.choiceDateCompare = true;
        this.choiceDayCompare = this.choiceMonthCompare = false;
        break;
      default:
        console.log('Choisir');
    }
  }

  formValid(): boolean {
    // tslint:disable-next-line:max-line-length
    return !(this.f.date.value === '' && this.f.month.value === '' && this.f.year.value === '' && this.f.date1.value === '' && this.f.date2.value === '');
  }

  selectChangeHandlerHub(event: any) {
    this.selectedHub = event.target.value;
    this.tableValues = [];
    this.globalStat = [];
    $('#exampleModalCenter').modal('hide');
  }

  subStatForm() {
    this.choiceSub = true;
    if (!this.formValid()) {
      return;
    }

    // Les Statistique par jour
    if (this.f.date.value !== '') {
      this.currentStat = 'Day';
      this.tableValues = [];
      this.currentTableValue = [];
      this.globalData = [];
      this.allCompagnieVente = [];
      const hubId: number = this.selectedHub;
      const dateInf = '' + this.f.date.value;

      // Stat par jour && voyage
      if (this.activeVoyage) {

        // Stat du jour
        this.voyageService.oneCompagnieVoyageByDay(+hubId, dateInf, +this.currentAgent.id).subscribe(
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.tableValues = this.getDataValue(value);
              this.currentTableValue = this.tableValues;
              this.tableTotalValues = HomeComponent.getTotalValues(this.tableValues);
            }
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
      if (this.activeVente) {
        this.venteService.oneCompagnieVenteByDay(+hubId, dateInf, +this.currentAgent.id).subscribe(
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.tableValues = this.getDataValue(value);
              this.currentTableValue = this.tableValues;
              this.tableTotalValues = HomeComponent.getTotalValues(this.tableValues);
            }
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
    }

    if (this.f.month.value !== '' && this.f.month.value !== '0' && this.f.year.value !== '0' && this.f.year.value !== '') {
      this.currentStat = 'Month';
      this.globalData = [];
      this.allCompagnieVente = [];
      this.tableValues = [];
      this.currentTableValue = [];
      this.month = HomeComponent.returnMonth(+this.f.month.value);
      this.year = this.f.year.value;
      console.log('Rechercher par Mois == ' + this.f.month.value + ' - ' + this.f.year.value);
      if (this.activeVoyage) {
        // tslint:disable-next-line: max-line-length
        this.voyageService.oneCompagnieVoyageByMonth(this.selectedHub, this.currentAgent.id, this.f.year.value, this.f.month.value).subscribe(
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.tableValues = this.getDataValue(value);
              this.currentTableValue = this.tableValues;
              this.tableTotalValues = HomeComponent.getTotalValues(this.tableValues);
            }
          }, err => console.log('Erreur donnée month == ' + err)
        );
      }
      if (this.activeVente) {
        this.venteService.oneCompagnieVenteByMonth(this.selectedHub, this.currentAgent.id, this.f.year.value, this.f.month.value).subscribe(
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.tableValues = this.getDataValue(value);
              this.currentTableValue = this.tableValues;
              this.tableTotalValues = HomeComponent.getTotalValues(this.tableValues);
            }
          }, err => console.log('Erreur donnée month == ' + err)
        );
      }
    }

    if (this.f.date1.value !== '' && this.f.date2.value !== '') {
      this.currentStat = 'Date';
      this.globalData = [];
      this.allCompagnieVente = [];
      this.currentTableValue = [];
      this.tableValues = [];
      this.date1 = new Date(this.f.date1.value);
      this.date2 = new Date(this.f.date2.value);
      if (this.activeVoyage) {
        this.voyageService.oneCompagnieVoyage(this.selectedHub, this.f.date1.value, this.f.date2.value, this.currentAgent.id).subscribe(
          value => {
            this.allCompagnieVente = value;
            this.tableValues = this.getDataValue(value);
            this.currentTableValue = this.tableValues;
            this.tableTotalValues = HomeComponent.getTotalValues(this.tableValues);
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
      if (this.activeVente) {
        this.venteService.oneCompagnieVente(this.selectedHub, this.f.date1.value, this.f.date2.value, this.currentAgent.id).subscribe(
          value => {
            this.allCompagnieVente = value;
            this.tableValues = this.getDataValue(value);
            this.currentTableValue = this.tableValues;
            this.tableTotalValues = HomeComponent.getTotalValues(this.tableValues);
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
    }
  }

  subStatFormCompare() {
    this.subFormCompare = true;

    // Les statistiques par jour
    if (this.fCompare.date.value !== '' && this.fCompare.compareDate.value !== '') {
      this.currentStatValues = [];
      this.currentCompareStatValues = [];
      const hubId = this.selectedHub;
      const dateInf = this.fCompare.date.value;
      // Stat par jour && voyage
      if (this.activeVoyage) {

        // Les stat du jour
        this.voyageService.oneCompagnieVoyageByDay(+hubId, dateInf, +this.currentAgent.id).subscribe(
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.currentStatValues = this.getDataValue(value);
              this.allCurrentStatValues = this.currentStatValues;

              // Les stat du jour comparaison
              const compareDateInf = this.fCompare.compareDate.value;
              this.voyageService.oneCompagnieVoyageByDay(+hubId, compareDateInf, this.currentAgent.id).subscribe(
                value1 => {
                  if (value1 !== null) {
                    this.allCompagnieVente = value1;
                    this.currentCompareStatValues = this.getDataValue(value1);
                    this.allCurrentCompareStatValues = this.currentCompareStatValues;
                    this.differencesCompareValues = [];
                    this.differencesCompareValues.push({
                      Valeur: HomeComponent.getTotalValues(this.currentStatValues),
                      Comparaison: HomeComponent.getTotalValues(this.currentCompareStatValues)
                    });

                    // this.statValuesCompare.push()
                  }
                }, err1 => console.log('Erreur compareDate stat :: ' + err1)
              );
            }
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
      //  Stat par jour && vente
      if (this.activeVente) {
        this.venteService.oneCompagnieVenteByDay(+hubId, dateInf, +this.currentAgent.id).subscribe(
          // Les stat du jour
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.currentStatValues = this.getDataValue(value);
              const compareDateInf = this.fCompare.compareDate.value;
              this.allCurrentStatValues = this.currentStatValues;
              this.venteService.oneCompagnieVenteByDay(+hubId, compareDateInf, this.currentAgent.id).subscribe(
                // Les stat du jour de comparaison
                value1 => {
                  if (value1 !== null) {
                    this.allCompagnieVente = value1;
                    this.currentCompareStatValues = this.getDataValue(value1);
                    this.allCurrentCompareStatValues = this.currentCompareStatValues;
                    this.differencesCompareValues = [];
                    this.differencesCompareValues.push({
                      Valeur: HomeComponent.getTotalValues(this.currentStatValues),
                      Comparaison: HomeComponent.getTotalValues(this.currentCompareStatValues)
                    });
                  }
                }, err1 => console.log('Erreur compareDate stat :: ' + err1)
              );
            }
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
    }

    // Les statistiques par mois
    if (this.fCompare.month.value !== '' && this.fCompare.year.value !== ''
      && this.fCompare.compareMonth.value !== '' && this.fCompare.compareYear.value !== '') {
      this.currentStatValues = [];
      this.currentCompareStatValues = [];
      const hubId = this.selectedHub;
      // Stat par mois && voyage
      if (this.activeVoyage) {
        // tslint:disable-next-line: max-line-length
        this.voyageService.oneCompagnieVoyageByMonth(+hubId, this.currentAgent.id, this.fCompare.year.value, this.fCompare.month.value).subscribe(
          // Les stat du mois
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.currentStatValues = this.getDataValue(value);
              this.allCurrentStatValues = this.currentStatValues;
              // tslint:disable-next-line: max-line-length
              this.voyageService.oneCompagnieVoyageByMonth(hubId, this.currentAgent.id, this.fCompare.compareYear.value, this.fCompare.compareMonth.value).subscribe(
                // Les stat du mois de comparaison
                value1 => {
                  if (value1 !== null) {
                    this.allCompagnieVente = value1;
                    this.currentCompareStatValues = this.getDataValue(value1);
                    this.allCurrentCompareStatValues = this.currentCompareStatValues;
                    this.differencesCompareValues = [];
                    this.differencesCompareValues.push({
                      Valeur: HomeComponent.getTotalValues(this.currentStatValues),
                      Comparaison: HomeComponent.getTotalValues(this.currentCompareStatValues)
                    });
                    this.getCompareDataValues(this.currentStatValues, this.currentCompareStatValues);
                  }
                }, err1 => console.log('Erreur compareDate stat :: ' + err1)
              );
            }
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
      // Stat par mois && vente
      if (this.activeVente) {
        // tslint:disable-next-line: max-line-length
        this.venteService.oneCompagnieVenteByMonth(+hubId, this.currentAgent.id, this.fCompare.year.value, this.fCompare.month.value).subscribe(
          // Stat du mois
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.currentStatValues = this.getDataValue(value);
              this.allCurrentStatValues = this.currentStatValues;
              // tslint:disable-next-line: max-line-length
              this.venteService.oneCompagnieVenteByMonth(+hubId, this.currentAgent.id, this.fCompare.compareYear.value, this.fCompare.compareMonth.value).subscribe(
                // Stat du mois de comparaison
                value1 => {
                  if (value1 !== null) {
                    this.allCompagnieVente = value1;
                    this.currentCompareStatValues = this.getDataValue(value1);
                    this.allCurrentCompareStatValues = this.currentCompareStatValues;
                    this.differencesCompareValues = [];
                    this.differencesCompareValues.push({
                      Valeur: HomeComponent.getTotalValues(this.currentStatValues),
                      Comparaison: HomeComponent.getTotalValues(this.currentCompareStatValues)
                    });
                    this.getCompareDataValues(this.currentStatValues, this.currentCompareStatValues);
                  }
                }, err1 => console.log('Erreur compareDate stat :: ' + err1)
              );
            }
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
    }

    // Les statitiques par date
    if (this.fCompare.date1.value !== '' && this.fCompare.date2.value !== ''
      && this.fCompare.compareDate1.value !== '' && this.fCompare.compareDate2.value !== '') {
      this.currentStatValues = [];
      this.currentCompareStatValues = [];
      const hubId = this.selectedHub;
      // Stat par date && voyage
      if (this.activeVoyage) {

        // Les stat de date
        this.voyageService.oneCompagnieVoyage(+hubId, this.fCompare.date1.value, this.fCompare.date2.value, this.currentAgent.id).subscribe(
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.currentStatValues = this.getDataValue(value);
              this.allCurrentStatValues = this.currentStatValues;

              // Les stat du date de comparaison
              // tslint:disable-next-line: max-line-length
              this.voyageService.oneCompagnieVoyage(hubId, this.fCompare.compareDate1.value, this.fCompare.compareDate2.value, this.currentAgent.id).subscribe(
                value1 => {
                  if (value1 !== null) {
                    this.allCompagnieVente = value1;
                    this.currentCompareStatValues = this.getDataValue(value1);
                    this.allCurrentCompareStatValues = this.currentCompareStatValues;
                    this.differencesCompareValues = [];
                    this.differencesCompareValues.push({
                      Valeur: HomeComponent.getTotalValues(this.currentStatValues),
                      Comparaison: HomeComponent.getTotalValues(this.currentCompareStatValues)
                    });
                  }
                }, err1 => console.log('Erreur compareDate stat :: ' + err1)
              );
            }
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
      // Stat par mois && vente
      if (this.activeVente) {

        // Stat de la date
        this.venteService.oneCompagnieVente(+hubId, this.fCompare.date1.value, this.fCompare.date2.value, this.currentAgent.id).subscribe(
          value => {
            if (value !== null) {
              this.allCompagnieVente = value;
              this.currentStatValues = this.getDataValue(value);
              this.allCurrentStatValues = this.currentStatValues;

              // Stat de date de comparaison
              // tslint:disable-next-line: max-line-length
              this.venteService.oneCompagnieVente(+hubId, this.fCompare.compareDate1.value, this.fCompare.compareDate2.value, this.currentAgent.id).subscribe(
                value1 => {
                  if (value1 !== null) {
                    this.allCompagnieVente = value1;
                    this.currentCompareStatValues = this.getDataValue(value1);
                    this.allCurrentCompareStatValues = this.currentCompareStatValues;
                    this.differencesCompareValues = [];
                    this.differencesCompareValues.push({
                      Valeur: HomeComponent.getTotalValues(this.currentStatValues),
                      Comparaison: HomeComponent.getTotalValues(this.currentCompareStatValues)
                    });
                  }
                }, err1 => console.log('Erreur compareDate stat :: ' + err1)
              );
            }
          }, err => console.log('Erreur donnée day == ' + err)
        );
      }
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

  setting() {
    $('#exampleModalCenter').modal('show');
  }

  selectFound(event: any) {
    this.filterData(event.target.value);
  }

  filterData(ligneFilter: string) {
    let currentValues = [];
    if (ligneFilter === 'all') {
      this.tableValues = this.currentTableValue;
      this.currentStatValues = this.allCurrentStatValues;
      this.currentCompareStatValues = this.allCurrentCompareStatValues;
    }
    for (const data of this.currentTableValue) {
      if (data.Route.routeLigne === ligneFilter) {
        currentValues.push({
          Route: data.Route,
          ValeurAller: data.ValeurAller,
          Aller: data.Aller,
          ValeurRetour: data.ValeurRetour,
          Retour: data.Retour
        });
        this.tableValues = currentValues;
      }
    }
    currentValues = [];
    for (const data of this.allCurrentStatValues) {
      if (data.Route.routeLigne === ligneFilter) {
        currentValues.push({
          Route: data.Route,
          ValeurAller: data.ValeurAller,
          Aller: data.Aller,
          ValeurRetour: data.ValeurRetour,
          Retour: data.Retour
        });
        this.currentStatValues = currentValues;
      }
    }
    currentValues = [];
    for (const data of this.allCurrentCompareStatValues) {
      if (data.Route.routeLigne === ligneFilter) {
        currentValues.push({
          Route: data.Route,
          ValeurAller: data.ValeurAller,
          Aller: data.Aller,
          ValeurRetour: data.ValeurRetour,
          Retour: data.Retour
        });
        this.currentCompareStatValues = currentValues;
      }
    }
  }

  getDataValue(allCompagnieVente): any[] {
    const statValues = [];
    if (allCompagnieVente.length === 0) {
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
      for (const oneArriveLigne of oneValue.lignesArrive) {
        const oneLineOfOneArrive: YobBookproBustrip = oneArriveLigne.ligne;
        const reservationOfOneLigneOfOneArrive: YobBookproOrders[] = oneArriveLigne.ligneReservations;
        // tslint:disable-next-line: no-shadowed-variable
        const values = HomeComponent.getValueByOrders(reservationOfOneLigneOfOneArrive);
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
      for (let i = 0; i < totalPlaceAller.length; i++) {
        totalSommePassager += totalPassagerAller[i];
        totalDenom += (totalPlaceAller[i] * totalVoyageAller[i]);
      }
      tauxReservationAller = (tauxReservationAller / compteur);
      tauxRemplissageAller = (totalSommePassager / totalDenom) * 100;
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
      for (const oneRetourLigne of oneValue.lignesDepart) {
        const oneLineOfOneRetour: YobBookproBustrip = oneRetourLigne.ligne;
        const reservationOfOneLigneOfOneRetour: YobBookproOrders[] = oneRetourLigne.ligneReservations;
        // tslint:disable-next-line: no-shadowed-variable
        const values = HomeComponent.getValueByOrders(reservationOfOneLigneOfOneRetour);
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
      tauxRemplissageRetour = (totalSommePassager / totalDenom) * 100;
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
      const values = HomeComponent.getLigneTotal(allerOfLigne, retourOfLigne);
      const totalRoute = values[0];
      const totalYobRoute = values[1];
      const totalAgentRoute = values[2];
      const nbrePassagerRoute = values[3];
      const nbreVoyageRoute = values[4];
      // const tauxRemplissageRoute = values[5];
      const tauxReservationRoute = values[6];
      totalSommePassager = 0;
      totalDenom = 0;
      for (let i = 0; i < totalPlaceAller.length; i++) {
        totalSommePassager += totalPassagerAller[i];
        totalDenom += (totalPlaceAller[i] * totalVoyageAller[i]);
      }
      for (let i = 0; i < totalPlaceRetour.length; i++) {
        totalSommePassager += totalPassagerRetour[i];
        totalDenom += (totalPlaceRetour[i] * totalVoyageRetour[i]);
      }
      const tauxRemplissageRoute = (totalSommePassager / totalDenom) * 100;
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
    for (const values of this.globalStat) {
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
      for (const aller of values.allerOfLigne) {
        sensAller = aller.totalValueAller[0].sens;
        totalAller = aller.totalValueAller[0].totalAller;
        totalYobAller = aller.totalValueAller[0].totalYobAller;
        totalAgentAller = aller.totalValueAller[0].totalAgentAller;
        nbrePassagerAller = aller.totalValueAller[0].nbrePassagerAller;
        nbreVoyageAller = aller.totalValueAller[0].nbreVoyageAller;
        tauxRemplissageAller = aller.totalValueAller[0].tauxRemplissageAller;
        tauxReservationAller = aller.totalValueAller[0].tauxReservationAller;
        if (aller.valuesAller.length !== 0) {
          for (const oneAller of aller.valuesAller) {
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
      for (const retour of values.retourOfLigne) {
        sensRetour = retour.totalValueRetour[0].sens;
        totalRetour = retour.totalValueRetour[0].totalRetour;
        totalYobRetour = retour.totalValueRetour[0].totalYobRetour;
        totalAgentRetour = retour.totalValueRetour[0].totalAgentRetour;
        nbrePassagerRetour = retour.totalValueRetour[0].nbrePassagerRetour;
        nbreVoyageRetour = retour.totalValueRetour[0].nbreVoyageRetour;
        tauxRemplissageRetour = retour.totalValueRetour[0].tauxRemplissageRetour;
        tauxReservationRetour = retour.totalValueRetour[0].tauxReservationRetour;
        if (retour.valuesRetour.length !== 0) {
          for (const oneAller of retour.valuesRetour) {
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
      statValues.push({
        Route: {
          routeLigne,
          routeTotal,
          routeTotalYob,
          routeTotalAgent,
          routeNbrePassager,
          routeNbreVoyage,
          routeTauxRemplissage,
          routeTauxReservation
        },
        Aller: {
          sensAller,
          totalAller,
          totalYobAller,
          totalAgentAller,
          nbrePassagerAller,
          nbreVoyageAller,
          tauxRemplissageAller,
          tauxReservationAller
        },
        ValeurAller: listOfLigneAller,
        Retour: {
          sensRetour,
          totalRetour,
          totalYobRetour,
          totalAgentRetour,
          nbrePassagerRetour,
          nbreVoyageRetour,
          tauxRemplissageRetour,
          tauxReservationRetour
        },
        ValeurRetour: listOfLigneRetour
      });
      statValues.sort((a, b) => (a.Route.routeLigne > b.Route.routeLigne) ? 1 : -1);
    }
    return statValues;
  }

  selectCompareDate() {
    this.compareDate = 'compare';
  }

  cancelSelectCompare() {
    this.compareDate = '';
  }

  logout() {
    this.authSrc.logout();
    $('#loginModalCenter').modal('hide');
    this.router.navigate(['/login']);
  }

  logoutModal() {
    $('#loginModalCenter').modal('show');
  }

  getCompareDataValues(allCompagnieVente1, allCompagnieVente2) {
    const statValues = [];
    statValues.push(allCompagnieVente1);
    // statValues.push(allCompagnieVente2);
    this.globalStat = [];
    for (const oneValue of allCompagnieVente1) {
      console.log('LIGNE VAL 1 ::: ' + oneValue.title);
    }
  }
}
