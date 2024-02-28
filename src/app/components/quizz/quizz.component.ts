import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";
@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{

  titulo:string ="";

  questions : any;
  questionSelected :any;

  answers:string []=[];
  answersSelected:string ="";

  questionIndex : number = 0;
  questionMaxIndex: number =0;

  fim : boolean = false;

  constructor(){}

  ngOnInit(): void {
    if(quizz_questions){
     // this.fim = false;
      this.titulo = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length
    }
  }

  buttonPress(value:string) {
    this.answers.push(value);
    this.nextStep()

  }
  async nextStep(){
    this.questionIndex +=1;
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalresulta:string = await this.checkResult(this.answers)
      this.fim = true;
      this.answersSelected = quizz_questions.results[finalresulta as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((prev,atual, i, arr) =>{
      if(arr.filter(item => item === prev).length >
        arr.filter(item => item === atual).length){
          return prev;
      }else{
        return atual;
      }
    })
    return result;
  }

}
