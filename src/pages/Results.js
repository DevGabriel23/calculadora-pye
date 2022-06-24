import React, { useState, useEffect } from "react";
import { ModalComponent as Modal } from "../components/Modal";
import Input from '../components/Input';
import { useModal } from "../elements/useModal";
import '../components/Main.css';
import { TableContainer, Table, Formulario, colors, Button, Title, Subtitle, GroupInput, Label, ButtonContainer } from "../elements/Form";
import { Link, Navigate, NavLink } from "react-router-dom";
import Home from "./Home";

export default function Results({ data, array}) {


    const [amplitud, setAmplitud] = useState({ content: "", valid: "" });
    const [unidadVariacion, setUnidadVariacion] = useState({ content: "", valid: "" });
    const [isOpen1, openModal1, closeModal1] = useModal("true");
    const [isOpen2, openModal2, closeModal2] = useModal();

    const [mediaDatosAgrupados, setMediaDatosAgrupados] = useState({ content: "", valid: "" });
    const [medianaDatosAgrupados, setMedianaDatosAgrupados] = useState({ content: "", valid: "" });
    const [modaDatosAgrupados, setModaDatosAgrupados] = useState({ content: "", valid: "" });

    const [mediaDatosNoAgrupados, setMediaDatosNoAgrupados] = useState({ content: 0, valid: "" });
    const [medianaDatosNoAgrupados, setMedianaDatosNoAgrupados] = useState({ content: 0, valid: "" });
    const [modaDatosNoAgrupados, setModaDatosNoAgrupados] = useState({ content: 0, valid: "" });

    const [desviacionMedia, setDesviacionMedia] = useState("");
    const [desviacionEstandar, setDesviacionEstandar] = useState("");
    const [varianza, setVarianza] = useState("");
    const [coeficienteVariacion, setCoeficienteVariacion] = useState("");
    const [option, setOption] = useState("");


    const [arrayDataFinal, setArrayDataFinal] = useState([]);

    let arrayData = [[]];

    function Create2DArray(rows) {
        var arr = [];

        for (var i = 0; i < rows; i++) {
            arr[i] = [];
        }

        return arr;
    }

    useEffect(() => {
        // console.log("useEffect arrayData: ",arrayData);
        if (arrayData.length > 0 && dataType === "1") {
            calculate();
            // console.log("useEffect medidas");
            medidasTendenciaCentral();
        }
    }, [arrayData]);

    useEffect(() => {
        // console.log("useEffect isOpen: ",arrayData);
        if (dataType === "1") {
            setMediaDatosAgrupados({ content: mediaCalc, valid: "" });
            setMedianaDatosAgrupados({ content: medianaCalc, valid: "" });
            setModaDatosAgrupados({ content: modaCalc, valid: "" });
            setArrayDataFinal(arrayData);
        } else if (isOpen1 === "false" && dataType === "2") {
            calculate();
            medidasTendenciaCentral();
            setMediaDatosAgrupados({ content: mediaCalc, valid: "" });
            setMedianaDatosAgrupados({ content: medianaCalc, valid: "" });
            setModaDatosAgrupados({ content: modaCalc, valid: "" });
            setArrayDataFinal(arrayData);
        }
    }, [isOpen1]);

    useEffect(() => {
        medidasDispersion();
    }, [mediaDatosAgrupados, medianaDatosAgrupados, modaDatosAgrupados]);

    const num = /^\d{1,14}(?:[.]\d{1,14})?/;

    const dataType = data.dataType;
    const testType = data.testType;
    const arrayNumber = array;
    let amp = amplitud.content;
    let uv = unidadVariacion.content;

    let mediaCalc, medianaCalc, modaCalc;
    let k, r, amp_calc, totalData = 0;
    let limInfExacto, limSupExacto;

    if (dataType === "1") { //Agrupados
        k = arrayNumber.length;
        uv = arrayNumber[1].limInf - arrayNumber[0].limSup;
        if (uv === 0) {
            limInfExacto = arrayNumber[0].limInf;
            limSupExacto = arrayNumber[arrayNumber.length - 1].limSup;
        } else {
            limInfExacto = arrayNumber[0].limInf - uv / 2;
            limSupExacto = arrayNumber[arrayNumber.length - 1].limSup + uv / 2;
        }
        r = limSupExacto - limInfExacto;
        amp = Math.round(r / k);
    } else if (dataType === "2") { //No agrupados
        arrayNumber.sort((a, b) => a - b); //Ordena el array de menor a mayor
        k = Math.round(1 + (3.322 * Math.log10(arrayNumber.length))); //Calcula numero de clases (k)
        r = Math.max(...arrayNumber) - Math.min(...arrayNumber); //Redondea el numero de clases
        amp_calc = r / k; //Calcula la amplitud   
    }

    const calculate = () => {
        // console.log("calculate");
        let frec = 0, frecAcumulada = 0;
        arrayData = Create2DArray(k); //Crea un array de 2 dimensiones
        if (dataType === "1") { //Agrupados
            for (let i = 0; i < k; i++) {
                arrayData[i][0] = arrayNumber[i].limInf; //Asigna el limite inferior
                arrayData[i][1] = arrayNumber[i].limSup; //Asigna el limite superior
                arrayData[i][3] = arrayNumber[i].frecuency; //Asigna la frecuencia
                totalData += arrayData[i][3]; //Suma las frecuencias
            }
        } else if (dataType === "2") { //No agrupados
            totalData = arrayNumber.length;
            if (amplitud.content !== "") {
                for (let i = 0; i < k; i++) {
                    arrayData[i][0] = arrayNumber[0] + (i * amp); //Limite inferior
                    arrayData[i][1] = (arrayNumber[0] + ((i + 1) * amp)) - uv; //Limite superior
                    arrayNumber.forEach(element => {
                        if (element >= arrayData[i][0] && element <= arrayData[i][1]) {
                            frec++;
                        }
                    });
                    arrayData[i][3] = frec; //Frecuencia
                    frec = 0;
                }
            }
        }

        for (let i = 0; i < k; i++) {
            arrayData[i][2] = (arrayData[i][0] + arrayData[i][1]) / 2; //Marca de la clase
            if (uv !== 0) {
                arrayData[i][4] = arrayData[i][0] - uv / 2; //Limite inferior exacto
                arrayData[i][5] = arrayData[i][1] + uv / 2; //Limite superior exacto
            } else {
                arrayData[i][4] = arrayData[i][0]; //Limite inferior exacto
                arrayData[i][5] = arrayData[i][1]; //Limite superior exacto
            }

            arrayData[i][6] = arrayData[i][3] / totalData //frecuencia relativa
            frecAcumulada += arrayData[i][3];
            arrayData[i][7] = frecAcumulada  //frecuencia acumulada
            arrayData[i][8] = totalData - frecAcumulada //frecuencia complementaria
        }
        // console.log("before calculate: ",arrayData);
    }

    const medidasTendenciaCentral = () => {
        let sumFrecXMarca = 0, posMediana, claseMediana, anchoIntervalo, maxValue = 0, deltaA, deltaB, claseModal;
        let sumaDatos = 0, mediana = 0, posMediana2;
        // Calcular medidas de tendencia central
        if (arrayData.length > 0) {
            for (let i = 0; i < k; i++) {
                sumFrecXMarca = sumFrecXMarca + (arrayData[i][2] * arrayData[i][3]); //Calcula la media
                if (arrayData[i][3] > maxValue) {
                    maxValue = arrayData[i][3]; //Calcula el valor maximo en las frecuencias
                    claseModal = i; //Calcula la clase modal
                }
            }
            mediaCalc = sumFrecXMarca / totalData; //Calcula la media
            posMediana = (totalData + 1) / 2; //Calcula la posicion de la mediana
            for (let i = 0; i < k; i++) {
                if (arrayData[i][7] > posMediana) {
                    claseMediana = i; //Calcula la clase de la mediana
                    break;
                }
            }
            anchoIntervalo = arrayData[claseMediana][5] - arrayData[claseMediana][4]; //Calcula el ancho del intervalo
            medianaCalc = arrayData[claseMediana][4] + ((((totalData / 2) - arrayData[claseMediana - 1][7]) / arrayData[claseMediana][3]) * (anchoIntervalo)); //Calcula la mediana
            totalData = 0;
            if (claseModal === 0) {
                deltaA = arrayData[claseModal][3]; //Calcula el delta A
                deltaB = arrayData[claseModal][3] - arrayData[claseModal][3]; //Calcula el delta B
            } else if (claseModal === k - 1) {
                deltaA = arrayData[claseModal][3] - arrayData[claseModal - 1][3]; //Calcula el delta A
                deltaB = arrayData[claseModal][3]; //Calcula el delta B
            } else {
                deltaA = arrayData[claseModal][3] - arrayData[claseModal - 1][3]; //Calcula el delta A
                deltaB = arrayData[claseModal][3] - arrayData[claseModal + 1][3]; //Calcula el delta B
            }
            modaCalc = arrayData[claseModal][4] + (deltaA / (deltaA + deltaB)) * anchoIntervalo; //Calcula la moda
            if (dataType === "2") {
                for (let i = 0; i < arrayNumber.length; i++) {
                    sumaDatos += arrayNumber[i];
                }
                setMediaDatosNoAgrupados({ content: sumaDatos / arrayNumber.length, valid: "" });

                if (arrayNumber.length % 2 === 0) { //Si el numero de datos es par
                    posMediana2 = (arrayNumber.length / 2) - 1;
                    mediana = (arrayNumber[posMediana2] + arrayNumber[posMediana2 + 1]) / 2;
                } else if (arrayNumber.length % 2 === 1) { //Si el numero de datos es impar
                    mediana = arrayNumber[Math.floor(arrayNumber.length / 2)];
                }
                setMedianaDatosNoAgrupados({ content: mediana, valid: "" });
                //paso 1: ordenar los datos
                arrayNumber.sort(function (a, b) { return a - b });
                //paso 2: Contar cuantas veces se repite el mismo numero y guardarlo en un array
                let arrayCount = [];
                let count = 1;
                // arrayCount = Create2DArray(arrayNumber.length);
                for (let i = 0; i < arrayNumber.length; i++) {
                    if (arrayNumber[i] === arrayNumber[i + 1]) {
                        count++;
                    } else {
                        arrayCount.push([arrayNumber[i], count]);
                        count = 1;
                    }
                }
                //paso 3: Recorrer el array de datos buscando el valor repetido más alto
                let max = 0;
                for (let i = 0; i < arrayCount.length; i++) {
                    if (arrayCount[i][1] > max) {
                        max = arrayCount[i][1];
                    }
                }
                //paso 4: Concatenar el o los valores repetidos más altos en una variable
                let arrayMax = [];
                for (let i = 0; i < arrayCount.length; i++) {
                    if (arrayCount[i][1] === max) {
                        arrayMax.push(arrayCount[i][0]);
                    }
                }
                //paso 5: Guardar la variable en el content de la moda de datos no agrupados
                if (arrayMax.length === 1) {
                    setModaDatosNoAgrupados({ content: arrayMax[0], valid: "" });
                }
                if (arrayMax.length > 1) {
                    setModaDatosNoAgrupados({ content: arrayMax, valid: "" });
                }
            }
        }
    }

    const medidasDispersion = () => {
        let sumDM = 0, mediaDM, desMed, xMenosMedia, xMenosMedia2, sumVarianza = 0, vari, n, desEst, coeficienteVari, frecXMenosMedia;
        if (arrayData.length > 0) {
            if (dataType === "1") { //Agrupados
                mediaDM = parseFloat(mediaDatosAgrupados.content).toFixed(3);
                n = arrayData[arrayData.length - 1][7];
                for (let i = 0; i < arrayData.length; i++) {
                    xMenosMedia = arrayData[i][2] - mediaDM;
                    frecXMenosMedia = arrayData[i][3] * Math.abs(xMenosMedia);
                    sumDM += frecXMenosMedia;
                    xMenosMedia2 = xMenosMedia * xMenosMedia * arrayData[i][3];
                    sumVarianza += xMenosMedia2;
                }
            }
            else if (dataType === "2") { //No agrupados
                mediaDM = parseFloat(mediaDatosNoAgrupados.content).toFixed(3);
                n = arrayNumber.length;
                for (let i = 0; i < n; i++) {
                    xMenosMedia = arrayNumber[i] - parseFloat(mediaDM);
                    sumDM += Math.abs(xMenosMedia);
                    xMenosMedia2 = Math.pow(xMenosMedia, 2);
                    sumVarianza += xMenosMedia2;
                }
            }
            if (testType === "1") { //Poblaciones se usa N
                desMed = sumDM / n;
                vari = sumVarianza / n;
            } else if (testType === "2") { //Muestra se usa N-1
                desMed = sumDM / (n - 1);
                vari = sumVarianza / (n - 1);
            }
            desEst = parseFloat(Math.sqrt(vari).toFixed(4));
            coeficienteVari = parseFloat(desEst / parseFloat(mediaDM)).toFixed(4);
            //guardar los datos en el state
            setDesviacionMedia(desMed);
            setDesviacionEstandar(desEst);
            setVarianza(vari);
            setCoeficienteVariacion(parseFloat(coeficienteVari));
        }
    }

    const setOptions = (e) => {
        console.log("texto");
        e.preventDefault();
        
        // setOption({e.target.elements.option.value})
        console.log(e.target);
    }

    return (
        <div>
            {dataType === "2" ?
                <Modal isOpen={isOpen1} closeModal={closeModal1} openModal={openModal1} id="input">
                    <Input
                        state={amplitud}
                        setState={setAmplitud}
                        type="text"
                        label="Amplitud a usar"
                        placeholder={"Amplitud calculada: " + amp_calc}
                        name="amp_calc"
                        errorMsg="No es un número"
                        regularExp={num}
                        onlyRead={"false"}
                    />
                    <Input
                        state={unidadVariacion}
                        setState={setUnidadVariacion}
                        type="text"
                        label="Unidad de variación"
                        placeholder="Unidad de variación"
                        name="unidadVariacion"
                        errorMsg="No es un número"
                        regularExp={num}
                        onlyRead={"false"}
                    />
                </Modal> : null}
            <main>
                <Formulario id="form" dType={arrayDataFinal.length > 0 ? "1" : "0"}>
                    <Title>Resultados</Title>
                    {arrayDataFinal.length > 0 && typeof (arrayDataFinal[0][0]) !== "undefined" ?
                        <>
                            <TableContainer name={"outerWrapper"}>
                                <TableContainer name={"tableWrapper"}>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th style={{ borderBottom: `1px solid ${colors.primary}` }}></th>
                                                <th colSpan={4}>Límite</th>
                                                <th style={{ borderBottom: `1px solid ${colors.primary}` }}></th>
                                                <th colSpan={4}>Frecuencia</th>
                                            </tr>
                                            <tr>
                                                <th style={{ borderTop: `1px solid ${colors.primary}` }}>Clase</th>
                                                <th>Inferior</th>
                                                <th>Superior</th>
                                                <th>Inferior<br />exacto</th>
                                                <th>Superior<br />exacto</th>
                                                <th style={{ borderTop: `1px solid ${colors.primary}` }}>Marca<br />de clase</th>
                                                <th>Absoluta</th>
                                                <th>Relativa</th>
                                                <th>Acumulada</th>
                                                <th>Complementaria</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {arrayDataFinal.map((element, index) => {
                                                return (
                                                    <tr key={index}> {/*style={{ display: (element[3] === 0 ? "none" : "default") }}*/}
                                                        <td>{String.fromCharCode(65 + index)}</td>
                                                        <td>{Number.isInteger(element[0]) ? element[0] : parseFloat(element[0]).toFixed(4)}</td> {/* Limite inferior */}
                                                        <td>{Number.isInteger(element[1]) ? element[1] : parseFloat(element[1]).toFixed(4)}</td> {/* Limite superior */}
                                                        <td>{Number.isInteger(element[4]) ? element[4] : parseFloat(element[4]).toFixed(4)}</td> {/* Limite inferior exacto */}
                                                        <td>{Number.isInteger(element[5]) ? element[5] : parseFloat(element[5]).toFixed(4)}</td> {/* Limite superior exacto */}
                                                        <td>{Number.isInteger(element[2]) ? element[2] : parseFloat(element[2]).toFixed(4)}</td> {/* Marca de clase */}
                                                        <td>{Number.isInteger(element[3]) ? element[3] : parseFloat(element[3]).toFixed(4)}</td> {/* Frecuencia absoluta */}
                                                        <td>{Number.isInteger(element[6]) ? element[6] : parseFloat(element[6]).toFixed(4)}</td> {/* Frecuencia relativa */}
                                                        <td>{Number.isInteger(element[7]) ? element[7] : parseFloat(element[7]).toFixed(4)}</td> {/* Frecuencia acumulada */}
                                                        <td>{Number.isInteger(element[8]) ? element[8] : parseFloat(element[8]).toFixed(4)}</td> {/* Frecuencia complementaria */}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </TableContainer>
                            </TableContainer>
                            <Title style={{ fontSize: "16px", fontWeight: "600" }}>{dataType == "2" ? "Datos ordenados: " + (arrayNumber.map((element, index) => { return (element) })) : null}</Title>
                            <p>Numero de clases: {k}</p>
                            <p>Numero de datos: {arrayDataFinal[arrayDataFinal.length - 1][7]}</p>
                            <p>Rango: {r.toFixed(4)}</p>
                            <p>Amplitud: {amp}</p>
                            <Button type="button" onClick={openModal2}>Abrir</Button>
                            <Modal openModal={openModal2} closeModal={closeModal2} isOpen={isOpen2} id="" setOptions={setOptions}>
                                
                            </Modal>
                        </> :
                        <>
                            <h2 style={{ gridColumn: "span 2" }}>Oops... deberías registrar datos primero</h2>
                            <Link to={"/"} style={{ width: "100%" }}><Button style={{ background: "#475469" }}>Volver</Button></Link>
                        </>}
                    <p>Hola</p>
                </Formulario>

                {arrayDataFinal.length > 0 && typeof (arrayDataFinal[0][0]) !== "undefined" ?
                    <>
                        <Formulario id="input" dType="1">
                            <Title>Medidas de tendencia central</Title>
                            <div>
                                <Subtitle style={{ display: (data.dataType === "2" ? "block" : "none") }}>Datos Agrupados</Subtitle>
                                <Input
                                    state={mediaDatosAgrupados}
                                    setState={setMediaDatosAgrupados}
                                    type="text"
                                    label="Media"
                                    onlyRead={"true"}
                                    value={mediaDatosAgrupados.content.toString() === "NaN" ? 0 : mediaDatosAgrupados.content.toFixed(4)}
                                />
                                <Input
                                    state={medianaDatosAgrupados}
                                    setState={setMedianaDatosAgrupados}
                                    type="text"
                                    label="Mediana"
                                    onlyRead={"true"}
                                    value={medianaDatosAgrupados.content.toString() === "NaN" ? 0 : medianaDatosAgrupados.content.toFixed(4)}
                                />
                                <Input
                                    state={modaDatosAgrupados}
                                    setState={setModaDatosAgrupados}
                                    type="text"
                                    label="Moda"
                                    onlyRead={"true"}
                                    value={modaDatosAgrupados.content.toString() === "NaN" ? 0 : modaDatosAgrupados.content.toFixed(4)}
                                />
                            </div>
                            <div style={{ display: (data.dataType === "2" ? "block" : "none") }}>
                                <Subtitle>Datos NO Agrupados</Subtitle>
                                <Input
                                    state={mediaDatosNoAgrupados}
                                    setState={setMediaDatosNoAgrupados}
                                    type="text"
                                    label="Media"
                                    onlyRead={"true"}
                                    value={mediaDatosNoAgrupados.content.toString() === "NaN" ? 0 : mediaDatosNoAgrupados.content.toFixed(4)}
                                />
                                <Input
                                    state={medianaDatosNoAgrupados}
                                    setState={setMedianaDatosNoAgrupados}
                                    type="text"
                                    label="Mediana"
                                    onlyRead={"true"}
                                    value={medianaDatosNoAgrupados.content.toString() === "NaN" ? 0 : medianaDatosNoAgrupados.content.toFixed(4)}
                                />
                                <Input
                                    state={modaDatosNoAgrupados}
                                    setState={setModaDatosNoAgrupados}
                                    type="text"
                                    label="Moda"
                                    onlyRead={"true"}
                                    value={modaDatosNoAgrupados.content.toString() === "NaN" ? 0 : modaDatosNoAgrupados.content.toString()}
                                />
                            </div>
                        </Formulario>
                        <Formulario id="input">
                            <Title>Medidas de dispersión</Title>
                            <Input
                                state={dataType === "1" ? mediaDatosAgrupados : mediaDatosNoAgrupados}
                                setState={dataType === "1" ? setMediaDatosAgrupados : setMediaDatosNoAgrupados}
                                type="text"
                                label="Media"
                                onlyRead={"true"}
                                value={dataType === "1" ? (mediaDatosAgrupados.content.toString() === "NaN" ? 0 : mediaDatosAgrupados.content.toFixed(4)) : (mediaDatosNoAgrupados.content.toString() === "NaN" ? 0 : mediaDatosNoAgrupados.content.toFixed(4))}
                            />
                            <Input
                                state={desviacionMedia}
                                setState={setDesviacionMedia}
                                type="text"
                                label="Desviación Media"
                                onlyRead={"true"}
                                value={desviacionMedia === "NaN" ? 0 : desviacionMedia.toFixed(4)}
                            />
                            <Input
                                state={varianza}
                                setState={setVarianza}
                                type="text"
                                label="Varianza"
                                onlyRead={"true"}
                                value={varianza === "NaN" ? 0 : varianza.toFixed(4)}
                            />
                            <Input
                                state={desviacionEstandar}
                                setState={setDesviacionEstandar}
                                type="text"
                                label="Desviación Estándar"
                                onlyRead={"true"}
                                value={desviacionEstandar === "NaN" ? 0 : desviacionEstandar}
                            />
                            <Link to={"/"} style={{ width: "100%" }}><Button style={{ background: "#475469" }}>Volver</Button></Link>
                        </Formulario>
                    </>
                    : null}
            </main>
        </div>
    );
}
