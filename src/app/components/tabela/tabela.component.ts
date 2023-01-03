import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms'
import { Product } from './../../Product';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  @Input() product?: Product;
  @Input() products: Product[] = []
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  formulario = new FormGroup ({
    id: new FormControl(),
    name: new FormControl(""),
    brand: new FormControl(""),
    price: new FormControl()
  })

  constructor(){}
  ngOnInit(): void {}

  ngOnChanges(bindingChange:any){
      this.formulario.patchValue({
        id: this.product?.id,
        name:this.product?.name,
        brand: this.product?.brand,
        price: this.product?.price
        })
    }

  handleSelect(id: number){
    this.select.emit(id);
  }

  handleDelete(id: number) {
    this.delete.emit(id);
  }

  handleEdit() {      
    this.edit.emit(this.formulario.value);
    let ref = document.getElementById("close")
    ref?.click();
  }

}
