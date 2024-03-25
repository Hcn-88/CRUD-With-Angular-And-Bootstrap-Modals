import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  myForm: FormGroup;
  tempo!: number;
  potencia!: number;
  status!: string;
  contador: string = "00:00"; 
  timer!: any;
  crescePontos: boolean = false;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      tempo: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      potencia: ['', [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  };

  ngOnInit(): void {};

  iniciarAquecimento(): void {
    if (!this.crescePontos) {
      this.crescePontos = true;
      if (this.validarInputs()) {
        this.tempo = Number(this.myForm.value.tempo);
        this.potencia = Number(this.myForm.value.potencia);
        this.atualizarContador();
        this.stringInformativo(this.tempo, this.potencia);
        let timeOut = Math.floor((this.tempo / 60) * 60 * 1000);
        setTimeout(() => {
          this.myForm.reset();
        }, timeOut);
        if (!this.timer) {
          this.contagem();
        };
      };
    } else {

    };
  };

  contagem(): void {
    this.timer = setInterval(() => {
      const timeParts = this.contador.split(":");
      let minutes = parseInt(timeParts[0], 10);
      let seconds = parseInt(timeParts[1], 10);
      if (seconds > 0) {
        seconds--;
      } else {
        if (minutes === 0) {
          this.pausarCancelar();
          return;
        }
        minutes--;
        seconds = 59;
      };
      this.contador = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);
  };

  pausarCancelar(): void {
    this.crescePontos = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    } else {
      this.contador = "00:00";
      this.status = "";
      this.myForm.reset();
    };
  };

  atualizarContador(): void {
    const min = Math.floor(this.tempo / 60);
    const minutos = `0${min}`;
    const seg = this.tempo % 60;
    const segundos = seg < 10 ? '0' + seg : seg;
    this.contador = `${minutos}:${segundos}`;
  };

  stringInformativo(tempo: number, potencia: number): string {
    let pontos = "";
    let currentLength = 0;
    const tempoInicial = tempo;
    const potenciaInicial = potencia;
    const timer = setInterval(() => {
      if (this.crescePontos && currentLength < tempoInicial) {
        pontos += ".".repeat(potenciaInicial) + " ";
        this.status = pontos;
        currentLength++;
      } else if (!this.crescePontos && currentLength < tempoInicial) {
        // esta condição é manter os pontos de string como '.' quando você pausa a contagem
      } else {
        clearInterval(timer);
        pontos = "Aquecimento concluído";
        this.status = pontos;
        setTimeout(() => {
          this.status = "";
        }, 2000);
      };
    }, 1000);
    return pontos;
  };

  validarInputs(): boolean {
    const tempoControl = this.myForm.get('tempo');
    const potenciaControl = this.myForm.get('potencia');

    if (tempoControl) {
      if (tempoControl.invalid) {
        if (tempoControl.errors?.['min'] || tempoControl.errors?.['max']) {
          alert('Por favor, insira um tempo válido entre 1 e 120.');
          return false;
        };
      };
      if(!tempoControl.value) {
        tempoControl.setValue(30);
      }
    };

    if(potenciaControl) {
      if (potenciaControl.invalid) {
        if (potenciaControl.errors?.['min'] || potenciaControl.errors?.['max']) {
          alert('Por favor, insira uma potência válida entre 1 e 10.');
          return false;
        };
      };
      if (!potenciaControl.value) {
        potenciaControl.setValue(10);
      }
    };
    return true;
  };

  ngOnDestroy(): void {
    clearInterval(this.timer);
  };

};