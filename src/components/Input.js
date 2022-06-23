import React from "react";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {Label,GroupInput,Input,ErrorText, IconValidate} from '../elements/Form';

const ComponentInput = ({state,setState,type,label,placeholder,name,errorMsg,regularExp,onlyRead,value}) => {
    const onChange = (e) => {
        setState({...state, content: e.target.value});
    }

    const validate = () => {
        if(regularExp){
            if(regularExp.test(state.content)){
                if(name=="frec"){
                    if(state.content.includes(".")){
                        setState({...state, valid: 'false'});
                    }else{
                        setState({...state, valid: 'true'});
                    }
                }else{
                    setState({...state, valid: 'true'});
                }
            }else{
                setState({...state, valid: 'false'});
            }
        }
    }

    return (
        <div>
            <Label htmlFor={name} valid = {state.valid}>{label}</Label>
            <GroupInput>
                <Input
                    type={type} 
                    placeholder={placeholder} 
                    id={name}
                    value={onlyRead === "true" ? value : state.content}
                    onChange={onChange}
                    onKeyUp={validate}
                    onBlur={validate}
                    valid = {state.valid}
                    disabled={onlyRead === "true" ? true : false}
                    />
                <IconValidate 
                    icon={state.valid === 'true' ? faCheckCircle : faTimesCircle}
                    valid = {state.valid}/>
            </GroupInput>   
            <ErrorText valid = {state.valid}>{errorMsg}</ErrorText>
        </div>
    );
}

export default ComponentInput;