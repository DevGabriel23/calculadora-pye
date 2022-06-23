import { Button, ModalContainer, Modal } from "../elements/Form";

const ModalComponent = ({children, isOpen, closeModal}) => {  
    const onSubmit = () => {
        if(children[0].props.state.valid === "true" && children[1].props.state.valid === "true"){
            closeModal();
        }
    }
    return (
        <Modal isOpen={isOpen}>
            <ModalContainer>
                {children}
                <Button type="submit" style={{marginTop:"10px"}} onClick={onSubmit}>Guardar</Button>
            </ModalContainer>
        </Modal>
    );
}

export {ModalComponent};