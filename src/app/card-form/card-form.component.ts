import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CcValidationService } from '../cc-validation.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  cardForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(5),
    ]),
    cardNumber: new FormControl('',[
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      this.ccValidator()
    ]),
    expiration: new FormControl(''),
    securityCode: new FormControl(''),
  })

  constructor(private CcValidationService: CcValidationService) { 
    console.log(this.cardForm.get('name'))
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.cardForm.value)
  }

  //trying to make a custom validator
  //VALIDATES IF IT'S A VALID CARD OR NOT (WORKS!)
  ccValidator(): ValidatorFn {
    return (control: AbstractControl) : { [key: string]: string } | null =>  {
      return this.CcValidationService.luhnCheck(control.value) ? null : { 'ccValidator': control.value }
    }
  }
}

//more info on control form on angular.io/api/forms/AbstractControl
//properties like valid, invalid, touched, pending, disable, pristine...