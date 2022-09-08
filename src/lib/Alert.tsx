import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';


class Alert {
    type
    message
    onClickFn?

    constructor (type: SweetAlertIcon, message: string, onClickFn?: Function) {
        this.type = type;
        this.message = message;
        this.onClickFn = onClickFn;
        this.handler();
    }


    handler(){

        const swal = Swal.fire({
            icon: this.type,
            text: this.message,
            confirmButtonText: "Ok"
        });

        const callback = (this.onClickFn) ? this.onClickFn : () => {}

        if(callback) swal.then((result) => {
            if(result.isConfirmed) callback()
        })

    }

}

export default Alert