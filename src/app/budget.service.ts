import { Injectable } from '@angular/core';
import { Budget, IBudget } from '../app/budget';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budget: any;


  private budgets: Array<Budget> = [
    { department: 'HR', budget: 150000},
    { department: 'Testing', budget: 120000},
    { department: 'Management', budget: 130000},
    { department: 'Technical', budget: 140000},
    { department: 'IT', budget: 100000},
    { department: 'Electrical', budget: 90000},
  ];

  constructor() { }

  getBudgetByDept(department: string): Observable<IBudget> {
    this.budget = this.budgets.find(item => item.department === department);

    return of(this.budget);
  }

}
