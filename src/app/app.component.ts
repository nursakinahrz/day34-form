import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom, map, take } from 'rxjs';
import { HttpBinService } from './http-bin.service';
import { UserData } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'd34';
  data!: UserData
  form!: FormGroup

  constructor(private http:HttpClient, private fb:FormBuilder,
    private httpbBinSvc: HttpBinService) {}
  
  ngOnInit(): void {
this.form = this.fb.group({
  userId: this.fb.control(''),
  name: this.fb.control(''),
  email: this.fb.control(''),
})
  }

  doPostAsForm() {
    const formdata: UserData = this.form.value
    this.httpbBinSvc.doPostAsForm(formdata)
    .then(result => {
      console.info('results: ', formdata)
      this.data = result
    })
    .catch(err => {
      console.error('>>>> error:', err)
    })
  }

  doPost() {
    const formdata: UserData = this.form.value
    this.httpbBinSvc.doPost(formdata)
    .then(result => {
      console.info('result:', formdata)
      this.data = result
    })
    .catch(err => {
      console.error('>>>> errror:', err)
    })
  }

  processForm() {
    const formData: UserData = this.form.value 
    this.httpbBinSvc.doGet(formData)
    .then(result => {
      this.data = result
    })
    .catch(error => {
      console.error('>>>> error:', error)
      this.data = error
    })
    .finally(() => {
      console.info(">>> finally")
      this.ngOnInit
    })

  }

  doGet() {
    this.http.get<any>('http://httpbin.org/get')
    .pipe(
      take(1),
      map(v => v.args)
    )
    firstValueFrom<UserData>(
      this.http.get<any>('http://httpbin.org/get?name=fred&email=fred@gmail.com')
      .pipe(
        take(1),
        map(v => v.args)
      )
    ).then(payload => {
      this.data = payload

    }).catch(error => {
      this.data = error
    
    });


  }
}
