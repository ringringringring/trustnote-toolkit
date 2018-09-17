import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Config } from '../../conf';
import RPCClient from '../../libs/rpcclient';

@Injectable()
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(pageIndex: number = 1, pageSize: number = 10, sortField: string, sortOrder: string, genders: string[]): Observable<{}> {
    let params = new HttpParams()
    .append('page', `${pageIndex}`)
    .append('results', `${pageSize}`)
    .append('sortField', sortField)
    .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.randomUserUrl}`, {
      params
    });
  }

  constructor(private http: HttpClient) {
  }
}

@Injectable()
export class SupernodeService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(pageIndex: number = 1, pageSize: number = 10, sortField: string, sortOrder: string, genders: string[]): Observable<{}> {
    let params = new HttpParams()
    .append('page', `${pageIndex}`)
    .append('results', `${pageSize}`)
    .append('sortField', sortField)
    .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.randomUserUrl}`, {
      params
    });
  }

  constructor(private http: HttpClient) {
  }

  getShowData(){
    let index: number = RPCClient.getInstance().getRoundIndex();
    return [
      {
        name   : 'John Brown',
        gender    : 'male',
        email: 'New York No. 1 Lake Park'
      },
      {
        name   : 'Jim Green',
        gender    : 'female',
        email: 'London No. 1 Lake Park'
      },
      {
        name   : 'Joe Black',
        gender    : 'male',
        email: 'Sidney No. 1 Lake Park'
      }
    ];
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ RandomUserService, SupernodeService ]
})
export class DashboardComponent implements OnInit {
  
  switchValue = false;

  tableDataSet = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  filterName = [
    { text: 'eduardo', value: 'santos' },
    { text: 'santos', value: 'eduardo' }
  ];
  searchGenderList: string[] = [];
  searchNameList: string[] = [];

  sort(sort: { key: string, value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  constructor(private randomUserService: RandomUserService) {
  }

  searchData(reset: boolean = false): void {

    
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.randomUserService.getUsers(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, this.searchGenderList).subscribe((data: any) => {
      this.loading = false;
      this.total = 200;
      this.dataSet = data.results;
    });
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  ngOnInit(): void {
    this.searchData();
  }
}
