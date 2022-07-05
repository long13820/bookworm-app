import './login.css'

function Login(){
    return (
        <div className='modal-dialog modal-dialog-centered login-modal' role="document">
            <div className='modal-content'>
                <div className='modal-header'>
                    <button type='button' className='close' data-dismiss="modal" aria-label='Close'>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className='modal-body'>
                    <form>
                        <input type="text" placeholder='Email address or username' className='form-control'/>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;
