import { YobBookproAgent } from '../../core/models/YobBookproAgent';
import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../core/services/agent.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss'],

})
export class SuperAdminComponent implements OnInit {
  agents: YobBookproAgent[] = [];
  constructor(private agentSrc: AgentService, private router: Router) {
  }

  ngOnInit() {
    this.agentSrc.getCompany().pipe(first()).subscribe(
      values => {
        this.agents = values;
      },
      error => console.log('erreur == ' + error));
    this.collapseMenu();
  }

 private collapseMenu() {
    console.log('collapse');
    const collapse = $('#collaspe-icon');
    if (!collapse.hasClass('fa-angle-double-left')) {
      $('#collapse-icon').addClass('fa-angle-double-left');

      // tslint:disable-next-line: only-arrow-functions
      $('[data-toggle=sidebar-colapse]').click(function() {
        SidebarCollapse();
      });
    } else {
      console.log('non icon !!');
      // tslint:disable-next-line: only-arrow-functions
      $('[data-toggle=sidebar-colapse]').click(function() {
        ShowSidebar();
      });
    }

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

    function ShowSidebar() {
      $('.menu-collapsed').removeClass('d-none');
      $('.sidebar-submenu').removeClass('d-none');
      $('.submenu-icon').removeClass('d-none');
      $('.findIput').removeClass('d-none');
      $('.wrapper').removeClass('active');

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

