import { FormControl } from "@angular/forms";

export class DateFormControl extends FormControl {

    override setValue(value: string, options: any): void{
        console.log(value)
        super.setValue(value + '*',options)
    }
}

//extends FormControl class so we can override the needed method while also calling the father method