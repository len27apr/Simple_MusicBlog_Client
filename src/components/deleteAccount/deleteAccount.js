import { useEffect } from 'react';
import ReactDOM from 'react-dom'
import classes from './deleteAccount.module.css'

export default function DeleteAccount({state,setUserDelete,...props}) {
    // const [modalIsOpen,setModalIsOpen]=useState(true);
    const portalElement=document.getElementById('userPortal')
    // console.log('the value of props are: ',props);
   
    useEffect(()=>{
        if(state==='exited')
        {
            setUserDelete(false);
        }
    },[state,setUserDelete])

    const deleteSuccess=()=>{
        props.deleteUserAccount();
    }

    const ModalClasses=[classes.modal,
        state==='entered' ? classes.userModalOpen :state==='exiting' ? classes.userModalClose:''
    ];
    // console.log('the modal classes are: ',ModalClasses);
    const BackdropClasses=[classes.backdrop,
        state==='entered' ? classes.backdropOpen : state==='exiting' ? classes.backdropClose:''
    ];
    // console.log('The backdrop classes are: ',BackdropClasses);
    const Modal=()=>{
        return(
            <div className={ModalClasses.join(' ')}>
                <h1 className={classes.headerModal}> Are you sure you want to delete this user?</h1>
                <button onClick={deleteSuccess} className={classes.success}>Yes</button>
                <button onClick={props.setUserModalIsOpen.bind(this,false)} className={classes.reject}>No</button>
            </div>
        )
    }
    
    const Backdrop=()=>{
        return <div onClick={setUserDelete.bind(this,false)} 
        className={BackdropClasses.join(' ')}></div>
        }

    return (
        <>
        {ReactDOM.createPortal(<Backdrop />,portalElement)};
        {ReactDOM.createPortal(<Modal />,portalElement)}
        </>
    )
}