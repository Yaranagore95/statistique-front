import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgentService } from '../../core/services/agent.service';
import { YobBookproAgent } from '../../core/models/YobBookproAgent';
import { FormBuilder} from '@angular/forms';
declare let $: any;

@Component({
  selector: 'app-admin-compagnie',
  templateUrl: './admin-compagnie.component.html',
  styleUrls: ['./admin-compagnie.component.scss']
})
export class AdminCompagnieComponent implements OnInit {

  elements: any = [];
  currentAgent = new YobBookproAgent();
  // Stat Date var
  date: Date;

  routes: any[];
  // tslint:disable-next-line:max-line-length
  constructor(private agentSrc: AgentService, private route: ActivatedRoute, private ngxService: NgxSpinnerService, private builder: FormBuilder) {
  }

  ngOnInit() {
    this.collapseMenu();
    this.agentSrc.agent(11).subscribe(
      val => {
        this.currentAgent = val;
      }
    );
  }

  private collapseMenu() {
    // Hide submenus
    // $('#body-row .collapse').collapse('hide');

    // Collapse/Expand icon
    $('#collapse-icon').addClass('fa-angle-double-left');

    // Collapse click
    // tslint:disable-next-line: only-arrow-functions
    $('[data-toggle=sidebar-colapse]').click(function() {
      SidebarCollapse();
    });

    function SidebarCollapse() {
      $('.menu-collapsed').toggleClass('d-none');
      $('.sidebar-submenu').toggleClass('d-none');
      $('.submenu-icon').toggleClass('d-none');
      $('.findIput').toggleClass('d-none');
      $('.wrapper').toggleClass('active');

      // Treating d-flex/d-none on separators with title
      const SeparatorTitle = $('.sidebar-separator-title');
      if (SeparatorTitle.hasClass('d-flex')) {
        SeparatorTitle.removeClass('d-flex');
      } else {
        SeparatorTitle.addClass('d-flex');
      }

      // Collapse/Expand icon
      $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
    }
  }
}
