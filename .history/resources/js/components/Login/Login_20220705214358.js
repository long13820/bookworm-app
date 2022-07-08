import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalBody } from 'reactstrap';
import './login.css'

function Login(){
    const [error, setError] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <form>
            <ModalBody>
                <div className='mb-3'>
                    <p className='mb-2'>Email</p>
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        id='email'
                        className={`form-control ${errors.email && 'border'}`}
                    />
                </div>
            </ModalBody>
        </form>
    )
}
export default Login;
