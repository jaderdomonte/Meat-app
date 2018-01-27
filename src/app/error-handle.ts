import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

export class ErrorHandle{

    static handleError(error: Response | any){
        let errorMessage:  string = error.toString()

        if(error instanceof Response){
            errorMessage = `Error ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`
        }

        console.log(errorMessage)
        return Observable.throw(errorMessage)
    }
}