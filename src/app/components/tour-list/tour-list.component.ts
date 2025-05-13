import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css'
})
export class TourListComponent {
  tours: any[] = [];
  tourName = '';
  participantInput = '';
  participants: string[] = [];

  constructor(private api: ApiService) {
    this.loadTours();
  }

  loadTours() {
    this.api.getTours().subscribe(data => this.tours = data);
  }

  addParticipant() {
    if (this.participantInput.trim()) {
      this.participants.push(this.participantInput.trim());
      this.participantInput = '';
    }
  }

  createTour() {
    if (!this.tourName || this.participants.length === 0) return;

    this.api.createTour({ name: this.tourName, participants: this.participants }).subscribe(() => {
      this.tourName = '';
      this.participants = [];
      this.loadTours();
    });
  }
}
