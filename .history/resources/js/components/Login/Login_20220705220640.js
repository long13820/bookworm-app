import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, ModalBody, ModalFooter } from 'reactstrap';
import './login.css'

function Login(){
    const [error, setError] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axios
            .post()
    }

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
                    {errors.email && <small className="text-danger">{errors.email.message}</small>}
                </div>
                <div className="mb-3">
                    <p className="mb-2">Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        className={`form-control ${errors.password && 'border-error'}`}
                        {...register('password', {
                        required: 'Password is required'
                        })}
                        onKeyUp={() => {
                            trigger('password');
                        }}
                    />
                    {errors.password && <small className="text-danger">{errors.password.message}</small>}
                </div>
                <div className="d-flex justify-content-end text-dark-blue">
                    <span className="pointer">Forgot your password?</span>
                </div>

                {error != '' ? (
                    <Alert color={error === 'Login succesfully' ? 'success' : 'danger'} className='mt-3'>
                        {error}
                    </Alert>
                ): (
                    ''
                )}
            </ModalBody>
            <ModalFooter>
                <Button className = "button login-btn background-dark-blue" type="submit">
                    Sign in{' '}
                </Button>
            </ModalFooter>
        </form>
    )
}
export default Login;
