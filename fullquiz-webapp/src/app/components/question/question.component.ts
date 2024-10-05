import { Component, OnChanges, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { Quiz } from "../../model/quiz";
import { findIndex } from "rxjs";
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-question',
    standalone: true,
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css'],
    imports: [CommonModule, FormsModule, MatCardModule]
  })
  export class QuestionComponent implements OnInit {
    
    quiz : Quiz[] | undefined;
  
    constructor(private apiService: ApiService) {}

    currentQuizIndex = 0;
    currentQuiz : Quiz | undefined;
    selectedReponse: string = '';
    showInfo = false;
    showResultat = false;
    resultat: string = '';

    ngOnInit(): void {
      
      this.apiService.getQuiz().subscribe(
        (data) => {
          this.quiz = data;
          this.quiz = this.shuffle(this.quiz);
          if(this.quiz) {
            this.currentQuiz = this.quiz[this.currentQuizIndex];
          }
          }
        )
      }

    validerReponse() {
        if(this.currentQuiz) {

          const index = this.currentQuiz.choix.findIndex((option) => option === this.selectedReponse) + 1;
          if (index.toString() == this.currentQuiz.reponse) {
                this.resultat = 'Bonne réponse !';
              } else {
                const idreponse : number = Number(this.currentQuiz.reponse)
                this.resultat = 'La bonne réponse est : ' + this.currentQuiz.choix[idreponse];
              }
        }

    
        this.showResultat = true;
        this.showInfo = true;
    
        setTimeout(() => {
          this.nextQuestion();
        }, 10000); // 2 secondes avant d'afficher la prochaine question
      }

      nextQuestion() {
        this.showResultat = false;
        this.showInfo = false;
        this.selectedReponse = '';
        
        if(this.quiz) {
            if (this.currentQuizIndex < this.quiz.length - 1) {
                this.currentQuizIndex++;
                this.currentQuiz = this.quiz[this.currentQuizIndex];
              } else {
                // Si c'est la dernière question, vous pouvez gérer ici la fin du quiz
                this.resultat = 'Quiz terminé !';
              }
        }

      }

      selectReponse(choix: string) {
        this.selectedReponse = choix;
      }

      shuffle(arr: any[]): any[] {
        let m = arr.length;
        while (m) {
          const i = Math.floor(Math.random() * m--);
          [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
      }

      
      
    
  }