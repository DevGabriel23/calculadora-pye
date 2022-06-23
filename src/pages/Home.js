import React,{useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Main from "../components/Main.js";
import Results from "./Results.js";


export default function Home() {

    const [array, setArray] = useState([]);
    const [data, setData] = useState({dataType: "", testType: ""});

    const calculate = (arrayNumber) => {
        setArray(arrayNumber);
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Main setArray={setArray} data={data} setData={setData} calculate={calculate}/>} />
                <Route exact path="/results" element={<Results data={data} array={array}/>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}
