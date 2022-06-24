import { GroupInput, Button, ModalContainer, Modal, ButtonContainer, Formulario, Label, Subtitle,} from "../elements/Form";

const ModalComponent = ({ children, isOpen, closeModal, id, setOptions }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(children[0]);
        if (children[0].props.state.valid === "true" && children[1].props.state.valid === "true") {
            closeModal();
        }
    }

    const onSubmit2 = (e) => {
        console.log("UWU");
        e.preventDefault();
        setOptions(e.target.elements.option.value);
        closeModal();
    }

    return (
        <Modal isOpen={isOpen}>
            <ModalContainer>

                {id === "input" ?
                    <>{children}
                        <Button type="submit" style={{ marginTop: "10px" }} onClick={onSubmit}>Guardar</Button>
                    </> :
                    <>
                        <Formulario onSubmit={onSubmit2}>
                            <Subtitle>Tipo de datos:</Subtitle>
                            <GroupInput id="radio">
                                <div style={{ display: "flex" }}>
                                    <input type="radio" name="option" value="1" style={{ position: "relative", top: "8px", width: "25px", height: "25px" }} required />
                                    <Label style={{ fontSize: "18px" }}>Nx</Label>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="radio" name="option" value="2" style={{ position: "relative", top: "8px", width: "25px", height: "25px" }} required />
                                    <Label style={{ fontSize: "18px" }}>Ny</Label>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="radio" name="option" value="3" style={{ position: "relative", top: "8px", width: "25px", height: "25px" }} required />
                                    <Label style={{ fontSize: "18px" }}>Intervalo</Label>
                                </div>
                            </GroupInput>
                            <ButtonContainer>
                                <Button type="submit">Iniciar</Button>
                            </ButtonContainer>
                        </Formulario>
                    </>}

            </ModalContainer>
        </Modal>
    );
}

export { ModalComponent };