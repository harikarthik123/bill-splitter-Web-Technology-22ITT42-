import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  tourId = '';
  balances: { [name: string]: number } = {};
  balanceKeys: string[] = []; // This will store the keys for iteration

  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.tourId = this.route.snapshot.params['id'];
    this.loadSummary();
  }

  loadSummary() {
    this.api.getSummary(this.tourId).subscribe(data => {
      this.balances = data;
      this.balanceKeys = Object.keys(data); // Assign keys to balanceKeys
    });
  }

  getFormattedAmount(amount: number): string {
    return amount > 0 ? `is owed ₹${amount.toFixed(2)}` :
           amount < 0 ? `owes ₹${Math.abs(amount).toFixed(2)}` :
           `is settled up`;
  }
}
