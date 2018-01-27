import { Component, OnInit, Input, AfterContentInit, ContentChild} from '@angular/core';
import { NgModel, FormControlName} from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string
  @Input() errorMessage: string

  input: any

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.input = this.model || this.control

    if(this.input === undefined){
      throw new Error('Esse componente necessita de uma diretiva NgModel ou FormControlName')
    }
  }

  hasError(): boolean {
    return this.input.invalid && this.isDirtyAndTouch()
  }

  hasSuccess(): boolean {
    return this.input.valid && this.isDirtyAndTouch()
  }

  isDirtyAndTouch(): boolean {
    return this.input.dirty || this.input.touched
  }
}
