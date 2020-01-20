import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {AuthService} from '../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {YobBookproAgent} from '../../core/models/YobBookproAgent';
import {Router} from '@angular/router';
import {AgentService} from '../../core/services/agent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentUser = new YobBookproAgent();
  form: FormGroup;
  sub = false;
  sucLogin = false;
  errLogin = false;

  constructor(private authSrc: AuthService, private buider: FormBuilder, private router: Router, private agentSrc: AgentService) {
  }

  ngOnInit() {
    this.authSrc.authenticate = false;
    this.authSrc.logout();
    this.form = this.buider.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  isSubmitted() {
    this.sub = true;
    this.sucLogin = false;
    this.errLogin = false;
    if (this.form.invalid) {
      return;
    }
    this.authSrc.login(this.f.username.value, this.f.password.value).pipe(first())
      .subscribe(
        response => {
          this.sub = false;
          if (response && response.status === 'ok') {
            const userId = response.userid;
            this.agentSrc.agentByUserId(userId).subscribe(
              val => {
                if (val !== null) {
                  const timesTampExp = new Date().getTime() + 86400000;
                  localStorage.setItem('dateExp', '' + timesTampExp);
                  localStorage.setItem('currentUser', JSON.stringify(val));
                  this.currentUser = val;
                  setTimeout(
                    () => {
                      this.router.navigate(['/admin-compagnie/home']);
                    }, 5000
                  );
                  this.sucLogin = true;
                }
              }, err => {
                this.errLogin = true;
                console.log('Agent by user error :: ' + err);
              }
            );
          } else {
            this.errLogin = true;
          }
        }, err => {
          this.sub = false;
          this.errLogin = true;
          console.log('erreur :: ' + err);
        }
      );
  }
}
