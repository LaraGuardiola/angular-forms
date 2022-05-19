import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  //* assertion ! operator asserts that the value is not null or undefined
  @Input() control!: FormControl;
  @Input() label!: string

  constructor() { }

  ngOnInit(): void {
  }

  //will add class is-danger if the control gives all true for all conditions
  showErrors(){
    const { dirty, touched, errors } = this.control
    return dirty && touched && errors
    //return this.control.dirty && this.control.touched && this.control.errors
  }

}
