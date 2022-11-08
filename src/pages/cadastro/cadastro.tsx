import { DivBody, DivBord, TextLogin, TextoLink} from "../../styles/components";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import http from "../../api/api";



export default function Cadastro(){

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        age: '',
        email: '',
        password: ''
    })
    
    const [request, setRequest] = useState("");

    function registerWorked(register : any){
        if((register.request.status) === 201){
            alert("Usuário criado com sucesso!");
            navigate("/login");
            return console.log("created");
        };
    }; 

    async function SubmitForm(e: React.FormEvent<HTMLFormElement>){

        e.preventDefault();

        console.log("Cadastrando Usuário!");
        
        try{
            const registerRequest = await http.post("api/users/cadastrar",{
                name: inputs.name,
                age: inputs.age,
                email: inputs.email,
                password: inputs.password
            })
            registerWorked(registerRequest);
        }
        catch(err){
            console.log(err);
            setRequest("Esse e-mail já foi cadastrado!");
        }
        
    };

    return(
        <div className="div-bg">
            <DivBody className="DivBody">
                <DivBord className="ContainerBord" onSubmit={SubmitForm}>
                    <TextLogin className="Title">
                        Cadastro
                    </TextLogin>
                    <TextLogin className="requestTest">
                        {request}
                    </TextLogin>
                    <TextField 
                        className="Inputs"
                        id="outlined-basic"
                        value={inputs.name}
                        label="Nome" 
                        variant="outlined"
                        required
                        type='text'
                        onChange={e => setInputs(prev => ({...prev, name: e.target.value}))}
                    />
                    <TextField 
                        className="Inputs"
                        id="outlined-basic"
                        value={inputs.age}
                        label="Idade" 
                        variant="outlined"
                        required
                        type='number'
                        onChange={e => setInputs(prev => ({...prev, age: e.target.value}))}
                    />
                    <TextField 
                        className="Inputs"
                        id="outlined-basic"
                        required
                        value={inputs.email}
                        label="Email" 
                        variant="outlined"
                        type='email'
                        onChange={e => setInputs(prev => ({...prev, email: e.target.value}))}
                    />
                    <TextField 
                        className="Inputs"
                        id="outlined-basic"
                        value={inputs.password}
                        label="Senha" 
                        variant="outlined"
                        required
                        type="password"
                        onChange={(e) => setInputs(prev => ({...prev, password: e.target.value}))}
                    />
                    <Button variant="contained" className="buttonLogin" type="submit">Cadastrar</Button>
                    <TextoLink className="textLink">
                        <Link to='/login'>
                            Já tem conta?
                        </Link>    
                    </TextoLink>
                </DivBord>
            </DivBody>
        </div>
    )
}