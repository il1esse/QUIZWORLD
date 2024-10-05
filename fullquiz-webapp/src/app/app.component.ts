import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Quiz } from './model/quiz';
import { QuestionComponent } from './components/question/question.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuestionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'fullquiz-webapp';

  message: string = '';
  quiz : Quiz[] | undefined;
  
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getMessage().subscribe(
      (data) => {
        this.message = data.message;
        console.log(this.message);
      },
      (error) => {
        console.error('Erreur lors de la récupération du message : ', error);
      }
    );


  }
}
