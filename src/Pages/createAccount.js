import React, {useContext, useState, useEffect}  from "react";
import UserContext from '../Context/userContext';
import Card from './card';

function CreateAccount(){
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable]   = useState(true);

    const ctx = useContext(UserContext);  

    function validate(field, label){
        if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        if(label === 'password' && field.length < 8){
          setStatus('Error: Password must have at least 8 characters ');
          setTimeout(() => setStatus(''),3000);
          return false;
        } 
        return true;
    }
  
    function handleCreate(){
        if (!validate(name,     'name'))     return;
        if (!validate(email,    'email'))    return;
        if (!validate(password, 'password')) return;
        ctx.users.push({name,email,password,balance:100});
        setShow(false);
    }    


    function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
    }
    
    useEffect(()=>{
        if (name || email || password){
          setDisable(false);
        }else{
          setDisable(true);
        }
    },[name, email, password])

    return (

        <Card
          bgcolor="primary"
          header="Create Account"
          status={status}
          body={show ? (  
                  <>
                  Name<br/>
                  <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e =>setName(e.currentTarget.value)} /><br/>
                  Email address<br/>
                  <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                  Password<br/>
                  <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                  <button type="submit" className="btn btn-light" onClick={handleCreate} disabled = {disable} >Create Account</button>
                  </>
                ):(
                  <>
                  <h5>Success</h5>
                  <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                  </>
                )}
        />
      )
}

export default CreateAccount;