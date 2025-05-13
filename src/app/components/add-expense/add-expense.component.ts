import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  tourId = '';
  tour: any;
  description = '';
  amount: number = 0;
  paidBy = '';
  sharedBy: string[] = [];
  selectedParticipant = '';

  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.tourId = this.route.snapshot.params['id'];
    this.loadTour();
  }

  loadTour() {
    this.api.getTours().subscribe(tours => {
      this.tour = tours.find((t: any) => t._id === this.tourId);
    });
  }

  toggleShared(p: string) {
    if (this.sharedBy.includes(p)) {
      this.sharedBy = this.sharedBy.filter(x => x !== p);
    } else {
      this.sharedBy.push(p);
    }
  }

  addExpense() {
    if (!this.description || !this.amount || !this.paidBy || this.sharedBy.length === 0) return;

    const expense = {
      description: this.description,
      amount: this.amount,
      paidBy: this.paidBy,
      sharedBy: this.sharedBy
    };

    this.api.addExpense(this.tourId, expense).subscribe(() => {
      this.description = '';
      this.amount = 0;
      this.paidBy = '';
      this.sharedBy = [];
    });
  }
}
