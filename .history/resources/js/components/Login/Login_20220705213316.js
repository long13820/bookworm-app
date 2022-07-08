import { ModalBody } from 'reactstrap';
import './login.css'

function Login(){
    return (
        <form>
            <ModalBody>
                <div className='mb-3'>
                    <p className='mb-2'>Email</p>
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        
                    />
                </div>
            </ModalBody>
        </form>
    )
}
export default Login;
