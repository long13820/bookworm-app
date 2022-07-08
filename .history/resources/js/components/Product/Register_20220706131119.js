import { useState } from "react";
import { useForm } from "react-hook-form";

function Register(){
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        
    }

return (
<div class="modal-dialog modal-dialog-centered register-modal" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                <input type="text" placeholder="First name" class="form-control" />
                <br />
                <input type="text" placeholder="Last name" class="form-control" />
                <br />
                <input type="text" placeholder="Email address" class="form-control" />
                <br />
                <input type="password" placeholder="Password" class="form-control" />
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="button button-primary">Create account</button>
        </div>
    </div>
</div>
);
}
export default Register
