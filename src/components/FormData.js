import React from "react";
import { ButtonContainer, Formulario, Label, Button, Title, Subtitle, GroupInput, Input } from "../elements/Form";
// import Input from "./Input";
const FormData = ({ state, setState }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        setState({ dataType: e.target.elements.dataType.value, testType: e.target.elements.testType.value });
    }

    return (
        <Formulario onSubmit={onSubmit} id='form' dType={state.dataType}>
            <Title>Calculadora Probabilidad y Estadística</Title>
            <Subtitle>Tipo de datos:</Subtitle>
            <GroupInput id="radio">
                <div style={{ display: "flex" }}>
                    <input type="radio" name="dataType" value="2" style={{ position: "relative", top: "8px", width: "25px", height: "25px" }} required />
                    <Label style={{ fontSize: "18px" }}>No agrupados</Label>
                </div>
                <div style={{ display: "flex" }}>
                    <input type="radio" name="dataType" value="1" style={{ position: "relative", top: "8px", width: "25px", height: "25px" }} required />
                    <Label style={{ fontSize: "18px" }}>Agrupados</Label>
                </div>
            </GroupInput>
            <Subtitle>Tipo de prueba:</Subtitle>
            <GroupInput id="radio">
                <div style={{ display: "flex" }} >
                    <input type="radio" name="testType" value="1" style={{ position: "relative", top: "8px", width: "25px", height: "25px" }} required />
                    <Label style={{ fontSize: "18px" }}>Población</Label>
                </div>
                <div style={{ display: "flex" }}>
                    <input type="radio" name="testType" value="2" style={{ position: "relative", top: "8px", width: "25px", height: "25px" }} required />
                    <Label style={{ fontSize: "18px" }}>Muestra</Label>
                </div>
            </GroupInput>
            <ButtonContainer>
                <Button type="submit">Iniciar</Button>
            </ButtonContainer>
        </Formulario>
    );
}

export default FormData;