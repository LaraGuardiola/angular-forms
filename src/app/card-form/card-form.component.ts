import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

const luhnCheck = (cardNumber: string): any => {
  if(!cardNumber.length){
    return
  }

  // Remove all whitespaces from card number.
  cardNumber = cardNumber.replace(/\s/g,'');

  // 1. Remove last digit;
  const lastDigit = Number(cardNumber[cardNumber.length - 1]);

  // 2. Reverse card number
  const reverseCardNumber = cardNumber
    .slice(0,cardNumber.length - 1)
    .split('')
    .reverse()
    .map(x => Number(x));
  
  let sum = 0;

  // 3. + 4. Multiply by 2 every digit on odd position.
  // Subtract 9 if digit > 9
  for(let i = 0; i <= reverseCardNumber.length -1; i += 2){
    reverseCardNumber[i] = reverseCardNumber[i]*2;
    if(reverseCardNumber[i] > 9){
      reverseCardNumber[i] = reverseCardNumber[i] - 9;
    }
  }

  // 5. Make the sum of obtained values from step 4.
  sum = reverseCardNumber
    .reduce((acc, currValue) => (acc + currValue), 0);

  // 6. Calculate modulo 10 of the sum from step 5 and the last digit. 
  // If it's 0, you have a valid card number :)
  return ((sum + lastDigit) % 10 === 0);
};

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
      Validators.minLength(12),
      this.ccValidator()
    ]),
    expiration: new FormControl(''),
    securityCode: new FormControl(''),
  })

  constructor() { 
    console.log(this.cardForm.get('name'))
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.cardForm.value)
  }

  //tryin to make a custom validator
  ccValidator(): ValidatorFn {
    return (control: AbstractControl) : { [key: string]: any } | null =>  {
      return luhnCheck(control.value) ? null : { 'ccValidator': control.value }
    }
  }
}

//more info on control form on angular.io/api/forms/AbstractControl
//properties like valid, invalid, touched, pending, disable, pristine...