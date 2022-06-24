import { Button, ModalContainer, Modal } from "../elements/Form";

const ModalComponent = ({children, isOpen, closeModal, openModal, id}) => {  
    const onSubmit = () => {
        console.log(children);
        for(let i = 0; i<children.lenght ; i++){
            if(children[i].props.state.valid === "true"){
                closeModal();
            }else{
                openModal();
            }
        }
        // closeModal();
    }
    
    const onClick = () =>{
        closeModal();
    }

    return (
        <Modal isOpen={isOpen}>
            <ModalContainer>
                {children}
                <Button type="submit" style={{marginTop:"10px"}} onClick={(id === "0" ? onSubmit : onClick)}>Guardar</Button>
            </ModalContainer>
        </Modal>
    );
}

export {ModalComponent};