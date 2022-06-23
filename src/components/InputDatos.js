import { React, useEffect, useState } from "react";
import { Formulario, ButtonContainer, Button, TableContainer, Table, colors } from '../elements/Form';
import Input from './Input';
import './Main.css';
import { Link } from 'react-router-dom'

const DatosNoAgrupados = ({ arrayNumber, setArrayNumber, onClick }) => {
    const [number, setNumber] = useState({ content: '', valid: null });
    const [validateForm, setValidateForm] = useState(null);

    const num = /^\d{1,14}(?:[.]\d{1,14})?/;

    const onSubmit = (e) => {
        e.preventDefault();
        if ((number.valid === 'true' && number.content !== '')) {
            setValidateForm(true);
            setArrayNumber([...arrayNumber, parseFloat(number.content)]);
            setNumber({ content: '', valid: null });
            document.getElementById('msgSuccess').textContent = 'Dato guardado correctamente';
            setTimeout(function () {
                document.getElementById('msgSuccess').textContent = ' ';
            }, 1000);
        } else {
            setValidateForm(false);
            setNumber({ content: '', valid: null });
        }
    }

    return (
        <Formulario onSubmit={onSubmit} id='input'>
            <Input
                state={number}
                setState={setNumber}
                type="text"
                label="Dato"
                placeholder="Ingrese un dato a la vez"
                name="dato"
                errorMsg="No es un número"
                regularExp={num}
            />
            <ButtonContainer>
                <Button type='submit'>Guardar</Button> <br />
                {arrayNumber.length > 1 ? <Link to={"/results"} style={{ width: "100%", textAlign:"center"}}><Button style={{ background: `${colors.secondary}` }} onClick={onClick}>Calcular</Button></Link> : null}
                <p id='msgSuccess'></p>
            </ButtonContainer>
            {arrayNumber.length > 0 ?
                <TableContainer name="outerWrapper">
                    <TableContainer name="tableWrapper">
                    <Table>
                        <thead>
                            <tr>
                                <th>Datos Guardados</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrayNumber.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item}</td>
                                    </tr>)
                            })}
                        </tbody>
                    </Table>
                    </TableContainer>
                </TableContainer> : null}
        </Formulario>
    );
}

const DatosAgrupados = ({ arrayNumber, setArrayNumber, onClick }) => {
    const [limInf, setLimInf] = useState({ content: '', valid: null });
    const [limSup, setLimSup] = useState({ content: '', valid: null });
    const [frecuency, setFrecuency] = useState({ content: '', valid: null });
    const [validateForm, setValidateForm] = useState(null);
    const [data, setData] = useState({ limInf: "", limSup: "", frecuency: "" });

    useEffect(() => {
        if (data.limInf !== '' && data.limSup !== '' && data.frecuency !== '') {
            setArrayNumber([...arrayNumber, data])
        }
    }, [data]);

    const num = /^\d{1,14}(?:[.]\d{1,14})?/;

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            (limInf.valid === 'true' && limInf.content !== '') &&
            (limSup.valid === 'true' && limSup.content !== '') &&
            (frecuency.valid === 'true' && frecuency.content !== '')) {
            setValidateForm(true);
            setData({ limInf: parseFloat(limInf.content), limSup: parseFloat(limSup.content), frecuency: parseFloat(frecuency.content) });

            setLimInf({ content: '', valid: null });
            setLimSup({ content: '', valid: null });
            setFrecuency({ content: '', valid: null });
            document.getElementById('msgSuccess').textContent = 'Dato guardado correctamente';
            setTimeout(function () {
                document.getElementById('msgSuccess').textContent = ' ';
            }, 1000);
        } else {
            setValidateForm(false);
            setLimInf({ content: '', valid: null });
            setLimSup({ content: '', valid: null });
            setFrecuency({ content: '', valid: null });
        }
    }

    return (
        <Formulario onSubmit={onSubmit} id='input'>
            <Input
                state={limInf}
                setState={setLimInf}
                type="text"
                label="Límite inferior"
                placeholder="Limite inferior"
                name="dato"
                errorMsg="No es un número"
                regularExp={num}
            />
            <Input
                state={limSup}
                setState={setLimSup}
                type="text"
                label="Límite superior"
                placeholder="Límite superior"
                name="dato"
                errorMsg="No es un número"
                regularExp={num}
            />
            <Input
                state={frecuency}
                setState={setFrecuency}
                type="text"
                label="Frecuencia"
                placeholder="Frecuencia"
                name="frec"
                errorMsg="No es un numero entero"
                regularExp={num}
            />
            <ButtonContainer>
                <Button type='submit'>Guardar</Button> <br />
                {arrayNumber.length > 1 ? <Link to={"/results"} style={{width: "100%", textAlign:"center" }}><Button style={{ background: `${colors.secondary}` }} onClick={onClick}>Calcular</Button></Link> : null}
                <p id='msgSuccess'></p>
            </ButtonContainer>
            {arrayNumber.length > 0 ?
                <TableContainer name="outerWrapper">
                    <TableContainer name="tableWrapper">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Clase</th>
                                    <th>Limite inferior</th>
                                    <th>Limite superior</th>
                                    <th>Frecuencia </th>
                                </tr>
                            </thead>
                            <tbody>

                                {arrayNumber.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{String.fromCharCode(65+index)}</td>
                                            <td>{item.limInf}</td>
                                            <td>{item.limSup}</td>
                                            <td>{item.frecuency}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </Table>
                    </TableContainer>
                </TableContainer> : null}
        </Formulario>
    );
}

export { DatosNoAgrupados, DatosAgrupados };