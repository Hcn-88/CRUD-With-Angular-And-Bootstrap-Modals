import { Product } from './../../Product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  @Input() product?: Product;
  @Output() submit: EventEmitter<any> = new EventEmitter()

  formulario = new FormGroup ({
    id: new FormControl(),
    name: new FormControl(""),
    brand: new FormControl(""),
    price: new FormControl()
  })

  constructor(){}
  ngOnInit(): void {}

  handleSubmit(){
    if(!this.formulario.value.name ||
      !this.formulario.value.brand ||
      !this.formulario.value.price) {
        return;
      }
      
    this.submit.emit(this.formulario.value);
    this.formulario.reset();
    let ref = document.getElementById("cancel")
    ref?.click();
  }

}
