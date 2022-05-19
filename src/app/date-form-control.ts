import { FormControl } from "@angular/forms";

//*INPUT MASKING

export class DateFormControl extends FormControl {
    //emitModelToViewChange updates the view for each change
    override setValue(value: any, options: any): void{
        if(!value){
            super.setValue('', { ...options, emitModelToViewChange: true })
            return
        }
        if(value.match(/[^0-9|\/]/gi)){
            super.setValue(this.value, { ...options, emitModelToViewChange: true })
            return
        }
        if(this.value.length === 3 && value.length === 2){
            super.setValue(this.value, { ...options, emitModelToViewChange: true })
            return
        }
        if(value.length > 5){
            super.setValue(this.value, { ...options, emitModelToViewChange: true })
            return
        }
        //for each 2 in length, add a / for the expiration date
        if(value.length === 2){
            super.setValue(value + '/',{...options, emitModelToViewChange: true })
            return
        }
        
    }
}

//extends FormControl class so we can override the needed method while also calling the father method