import {Component, OnInit} from '@angular/core';
import {YobBookproAgent} from '../../../core/models/YobBookproAgent';
import {GlobalSrcService} from '../../../core/services/global-src.service';
import {YobBookproOrders} from '../../../core/models/YobBookproOrders';
import {YobBookproPassenger} from '../../../core/models/YobBookproPassenger';
import {NgxSpinnerService} from 'ngx-spinner';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chartType = 'pie';
  chartDataVentes = [{data: [], label: 'Ventes Chart'}];
  chartDataVoyages = [{data: [], label: 'Voyages Chart'}];
  ventesColors = [{}];
  voyagesColors = [];
  ventesLabels = [];
  infoVentesCompanyArray = [];
  infoVoyagesCompanyArray = [];
  voyagesLabels = [];
  listColor = ['#4D536A', '#42D4F4', '#FDB45C', '#911EB4', '#EBA428', '#586B13', '#E87037', '#E83737', '#46BFBD'];
  chartOptions = {
    responsive: true
  };
  agents: YobBookproAgent[] = [];
  montantVente = 0;
  totalYobuma = 0;
  totalAgent = 0;
  montantVoyage: number;
  totalYobumaV: number;
  totalAgentV: number;
  nbrePassagers: number;
  nbreVoyages: number;
  reservationsGroupebByCompagnies: any[] = [];
  voyagesGroupedByCompagnies: any[] = [];
  displayVente = false;
  displayVoyage = false;
  compareCompVente = [];
  compareCompVoyages = [];
  readyData1 = false;
  readyData2 = false;
  readyData3 = false;

  constructor(private globalSrc: GlobalSrcService, private ngxService: NgxSpinnerService) {
  }

  ngOnInit() {
    // this.ngxService.show();
    // this.globalSrc.agents().subscribe(
    //   val => {
    //     this.agents = val;
    //     this.globalSrc.reservationsGroupedByCompagnie('2019-12-01', '2019-12-31').subscribe(
    //       // tslint:disable-next-line:max-line-length
    //       val1 => {
    //         this.reservationsGroupebByCompagnies = val1;
    //         this.getCardVentesValues(val1);
    //         this.readyData1 = true;
    //       }, err1 => console.log('Reccuperations des reservationsGroupedByCompagnie erreur ' + err1)
    //     );
    //     this.globalSrc.voyagesGroupedByCompagnie('2019-12-01', '2019-12-31').subscribe(
    //       // tslint:disable-next-line:max-line-length
    //       val2 => {
    //         this.voyagesGroupedByCompagnies = val2;
    //         this.getCardVoyageValues(val2);
    //         this.readyData2 = true;
    //         console.log('Les voyages  === ' + this.voyagesGroupedByCompagnies.length);
    //       }, err2 => console.log('erreur == ' + err2)
    //     );
    //   }, err => console.log('erreur agent = ' + err),
    //   () => {
    //     this.ngxService.hide();
    //     console.log('Donnée prête !!!!!!!');
    //   }
    // );
    // this.ngxService.hide();
  }

  chartClicked() {
  }

  chartHover() {
  }

  jqueryCount() {
    $('.counter').each(function() {
      $(this)
        .prop('Counter', 0)
        .animate(
          {
            Counter: $(this).text()
          },
          {
            duration: 5000,
            easing: 'swing',
            step(now) {
              $(this).text(Math.ceil(now));
            }
          }
        );
    });
  }

  jqueryCount2() {
    $('.counter1').each(function() {
      $(this)
        .prop('Counter', 0)
        .animate(
          {
            Counter: $(this).text()
          },
          {
            duration: 5000,
            easing: 'swing',
            step(now) {
              $(this).text(Math.ceil(now));
            }
          }
        );
    });
  }

  getCardVentesValues(reservationsGroupedByCompagnie: any[]) {
    /*    let montantVente = 0;
        let montantYob = 0;
        let montantAgent = 0;
        let nbreBillet = 0;
        let nbreCancelledBillet = 0;
        const data = [];
        let total = 0;
        let i = 0;
        let nbPassager = 0;
        const colorChart = [];
        for (const comp of reservationsGroupedByCompagnie) {
          // let compTotal = 0;
          let cptPassager = 0;
          let companyTotal = 0;
          if (comp.confirmedOrders.length !== 0) {
            this.ventesLabels.push(comp.compagnie);
            colorChart.push(this.listColor[i + 1]);
            i++;
            // @ts-ignore
            for (const reservation: YobBookproOrders of comp.confirmedOrders) {
              montantVente += reservation.total;
              total = total + reservation.total;
              companyTotal += reservation.total;
              nbPassager += reservation.yobBookproPassengers.length;
              cptPassager += reservation.yobBookproPassengers.length;
              if (reservation.payMethod.toLocaleLowerCase() === 'agent') {
                montantAgent += reservation.total;
              } else {
                montantYob += reservation.total;
              }
              nbreBillet += reservation.yobBookproPassengers.length;
            }
            data.push(cptPassager);
            this.infoVentesCompanyArray.push({compagnie: comp.compagnie, total: companyTotal});
            this.compareCompVente.push({comp: comp.compagnie, passager: nbPassager});
          }
          if (comp.cancelledOrders.length !== 0) {
            // @ts-ignore
            nbreCancelledBillet += comp.cancelledOrders.length;
          }
        }
        this.compareCompVente.sort((a, b) => (a.passager < b.passager) ? 1 : -1);
        this.chartDataVentes = [{data, label: 'Ventes Chart'}];
        this.ventesColors = [{backgroundColor: colorChart, hoverBackgroundColor: colorChart, borderWidth: 2}];
        for (const val of colorChart) {
          console.log('Couleur == ' + val);
        }
        this.montantVente = montantVente;
        this.totalYobuma = montantYob;
        this.totalAgent = montantAgent;
        this.nbreTicked = nbreBillet;
        this.displayVente = true;
        this.jqueryCount();*/
    let montantVente = 0;
    let montantYobuma = 0;
    let montantAgent = 0;
    let nbreTicket = 0;
    let nbreCancelledTicket = 0;
    const data = [];
    const colorChart = [];
    let i = 0;
    for (const comp of reservationsGroupedByCompagnie) {
      let montantCompagnieVente = 0;
      let nbrePassager = 0;
      let cancelTicket = 0;
      if (comp.confirmedOrders.length !== 0) {
        colorChart.push(this.listColor[i + 1]);
        this.ventesLabels.push(comp.compagnie);
        i++;
        // @ts-ignore
        for (const order: YobBookproOrders of comp.confirmedOrders) {
          if (order.payStatus === 'SUCCESS' && order.orderStatus === 'CONFIRMED') {
            montantVente += order.total;
            montantCompagnieVente += order.total;
            if (order.payMethod === 'Agent') {
              montantAgent += order.total;
            } else {montantYobuma += order.total; }
            // @ts-ignore
            nbreTicket += order.yobBookproPassengers.length;
            nbrePassager += order.yobBookproPassengers.length;
          }
        }
        nbreCancelledTicket += comp.cancelledOrders.length;
        cancelTicket += comp.cancelledOrders.length;
        data.push(nbrePassager);
        this.compareCompVente.push({comp: comp.compagnie, passager: nbrePassager});
        this.infoVentesCompanyArray.push({comp: comp.compagnie, passager: nbrePassager, montant: montantCompagnieVente, cancelTicket});
      }
    }
    this.montantVente = montantVente;
    this.totalYobuma = montantYobuma;
    this.totalAgent = montantAgent;
    this.compareCompVente.sort((a, b) => (a.passager < b.passager) ? 1 : -1);
    this.chartDataVentes = [{data, label: 'Ventes Chart'}];
    this.ventesColors = [{backgroundColor: colorChart, hoverBackgroundColor: colorChart, borderWidth: 2}];
    this.displayVente = true;
  }

  getCardVoyageValues(voyagesGroupedByCompagnies: any[]) {
    let montantVoyage = 0;
    let nbrePassager = 0;
    let nbreVoyage = 0;
    let montantY = 0;
    let montantA = 0;
    const data = [];
    const chartColor = [];
    let i = 0;
    for (const comp of voyagesGroupedByCompagnies) {
      console.log('La compagnie == ' + comp.compagnie);
      let totalComp = 0;
      // let total = 0;
      let nbPassager = 0;
      if (comp.reservations.length !== 0) {
        this.voyagesLabels.push(comp.compagnie);
        chartColor.push(this.listColor[i + 1]);
        i++;
        // @ts-ignore
        for (const reservation: YobBookproOrders of comp.reservations) {
          totalComp += reservation.total;
          this.montantVoyage += reservation.total;
          // nbrePassager += reservation.yobBookproPassengers.length;
          if (reservation.payMethod.toLocaleLowerCase() === 'agent') {
            montantA += reservation.total;
          } else {
            montantY += reservation.total;
          }
          nbrePassager += reservation.yobBookproPassengers.length;
          nbPassager += reservation.yobBookproPassengers.length;
        }
        nbreVoyage += comp.nbreVoyage;
        montantVoyage += totalComp;
        data.push(comp.nbreVoyage);
        this.compareCompVoyages.push({comp: comp.compagnie, voyage: comp.nbreVoyage});
        this.infoVoyagesCompanyArray.push({comp: comp.compagnie, montant: totalComp, voyage: comp.nbreVoyage, passager: nbPassager});
      }
    }
    this.montantVoyage = montantVoyage;
    this.nbrePassagers = nbrePassager;
    this.nbreVoyages = nbreVoyage;
    this.totalYobumaV = montantY;
    this.totalAgentV = montantA;
    this.chartDataVoyages = [{data, label: 'Voyage Chart'}];
    this.voyagesColors = [{backgroundColor: chartColor, hoverBackgroundColor: chartColor, borderWidth: 2}];
    for (const val of chartColor) {
      console.log('Couleur == ' + val);
    }
    this.displayVoyage = true;
    this.compareCompVoyages.sort((a, b) => (a.voyage < b.voyage) ? 1 : -1);
    this.jqueryCount2();
  }
}
