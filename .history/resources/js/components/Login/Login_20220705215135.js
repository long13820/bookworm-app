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
                        className={`form-control ${errors.email && 'border-error'}`}
                        {...register('email', {
                            required: 'Email is required',
                            pattern:{
                                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email must be valid'
                            }
                        })}
                        onKeyUp={()=>{
                            trigger('password')
                        }}
                    />
                    {errors.email && <small className="text-danger"></small>}
                </div>
            </ModalBody>
        </form>
    )
}
export default Login;
