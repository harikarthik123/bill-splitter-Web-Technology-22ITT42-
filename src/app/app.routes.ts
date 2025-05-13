import { Routes } from '@angular/router';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { SummaryComponent } from './components/summary/summary.component';

export const routes: Routes = [
  { path: '', component: TourListComponent },
  { path: 'expenses/:id', component: AddExpenseComponent },
  { path: 'summary/:id', component: SummaryComponent }
];
