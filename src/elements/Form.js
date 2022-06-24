import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colors = {
    border: '#8CA7CF',
    error: '#DD3131',
    success: '#2DEB3D',
    primary: '#7288A8',
    secondary: '#475469',
}

const Formulario = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 40px;
    border:3px solid ${colors.primary};

    @media(max-width: 800px){
        grid-template-columns: 1fr;
    }
    
    ${props => props.id === 'input' && css`
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top: none;
    `}

    ${props => props.id === 'form' && css`
        border-radius: 15px;
    `}

    ${props => (props.dType === "1" || props.dType === "2" || props.id === "results") && css`
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    `}
`;

const Label = styled.label`
    display: block;
    font-weight: 700;
    padding: 10px;
    min-height: 40px;
    cursor: pointer;
    color: #000;
    min-width: max-content;


    ${props => props.valid === 'false' && css`
        color: ${colors.error};
    `}
`;

const GroupInput = styled.div`
    position: relative;
    z-index: 90;

    ${props => props.id === 'radio' && css`
        display: flex;
    `}

    @media(max-width: 470px){
        flex-direction: column;
    }
`;

const Input = styled.input`
    width: 100%;
    background: #fff;
    border-radius: 5px;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 1px solid ${colors.border};

    &:focus{
        border: 3px solid ${colors.border};
        outline: none;
        box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
    }

    ${props => props.disabled === true && css`
        disabled: true;
        font-weight: 900;
        font-size: 16px;
        &:hover{
            cursor: not-allowed;
        }
    `}

    ${props => props.valid === 'true' && css`
        border: 3px solid transparent;
    `}

    ${props => props.valid === 'false' && css`
        border: 3px solid ${colors.error} !important;
    `}

`;

const ErrorText = styled.p`
    font-size: 12px;
    margin-bottom: 0;
    color: ${colors.error};
    display: none;

    ${props => props.valid === 'true' && css`
        display: none;
    `}

    ${props => props.valid === 'false' && css`
        display: block;
    `}
`;

const IconValidate = styled(FontAwesomeIcon)`
    position: absolute;   
    right: 10px;
    bottom: 14px;
    z-index: 100;
    font-size: 16px;
    opacity: 0;

    ${props => props.valid === 'false' && css`
        color: ${colors.error};
        opacity: 1;
    `}

    ${props => props.valid === 'true' && css`
        color: ${colors.success};
        opacity: 1;
    `}
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: span 2;
    @media(max-width: 800px){
        grid-column: span 1;
    }
`;

const Button = styled.button`
    height: 45px;
    line-height: 45px;
    width: 30%;
    background: ${colors.border};
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: .1s ease all;

    &:hover{
        box-shadow: 3px 0px 30px rgba(163, 163, 163, 1);
    }
`;

const TableContainer = styled.div`
    display: grid;
    grid-column: span 2;

    @media(max-width: 800px){
        grid-column: span 1;
    }

    ${props => props.name === 'outerWrapper' && css`
        border: 1px solid ${colors.primary};
        box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
        margin: 20px;
        border-radius: 15px;
        max-width: 800px;
    `}

    ${props => props.name === 'tableWrapper' && css`
        max-height: 320px;
        overflow-y: scroll;
        margin: 20px;
    `}

    div::-webkit-scrollbar{  
        width: 10px;
        height: 10px;
        background-color: ${colors.border};
    }

    div::-webkit-scrollbar-thumb {
        background-color: ${colors.secondary};
        border-radius: 50px;
    }
    
    div::-webkit-scrollbar-thumb:hover {
        background-color: #3A4455;
    }

`;

const Table = styled.table`

    border: 1px solid ${colors.secondary};
    border-collapse: separate;
    border-spacing: 0;
    min-width: max-content;
    
    th{
        position: sticky;
        top: 0;
        background-color: ${colors.primary};
        color: #fff;
    }
        
    th,td{
        border: 1px solid #000; 
        padding: 10px;
        text-align: center;
    }

`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 999;
    justify-content: center;
    align-items: center;
    
    ${props => props.isOpen === 'true' && css`
        display: flex;
    `}
    ${props => props.isOpen === 'false' && css`
        display: none;
    `}
`;

const ModalContainer = styled.div`
    position: relative;
    background: #fff;
    min-width: 320px;
    max-width: 480px;
    min-height: 200px;
    max-height: 400px;
    padding: 1rem;
    overflow-y: auto;
    border-radius: 15px;
    border: 3px solid ${colors.border};
`;

const Title = styled.h1`
    grid-column: span 2;

    @media(max-width: 800px){
        grid-column: span 1;
    }
`;

const Subtitle = styled.h3`
    grid-column: span 2;

    @media(max-width: 800px){
        grid-column: span 1;
    }
`;


export {
    Formulario,
    Label,
    GroupInput,
    Input,
    ErrorText,
    IconValidate,
    ButtonContainer,
    Button,
    TableContainer,
    Table,
    Modal,
    ModalContainer,
    Title,
    Subtitle,
    colors
};