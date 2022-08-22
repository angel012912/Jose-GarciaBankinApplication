import Card from './card';
import UserContext from '../Context/userContext';
import { useContext, useState } from 'react';

function Withdraw(){
  const ctx = useContext(UserContext);
  const [withdraw, setWithdraw] = useState(0);
  const [actualBalance, setActualBalance] = useState(ctx.users[0].balance);
  const [show, setShow] = useState(true);
  const [disable, setDisable] = useState(true);
  const [status, setStatus] = useState(`Balance Information: ${actualBalance}`);

  function WithdrawAmount(){
    ctx.users[0].balance = actualBalance - parseInt(withdraw);
    setActualBalance(ctx.users[0].balance);
    setStatus(`Balance Information: ${ctx.users[0].balance}`);
    setShow(false);
  }

  function clearForm(){
    setWithdraw('');
    setShow(true);
  }

  function handleOnChange(e){
    if(isNaN(e.currentTarget.value)){
      setStatus('ERROR: You can only introduce numbers');
      setDisable(true);
    }else{
      setStatus(`Balance Information: ${actualBalance}`);
      if (e.currentTarget.value !== ''){
        if(parseInt(e.currentTarget.value) > 0){
          if(parseInt(e.currentTarget.value) > actualBalance){
            setStatus('ERROR: You are exceeding the total of your account');
            setDisable(true);
          }else{
            setDisable(false);
          }
        }else{
          setStatus('ERROR: You need to introduce a positive number');
          setDisable(true);
        }
      }else{        
        setDisable(true);
      }
    }
    setWithdraw(e.currentTarget.value);
  }

    return (
      <>
      <Card
        bgcolor = "primary"
        header = "Withdraw"
        status = {status}
        body = {show ? 
        (<>
          Amount of withdraw<br/>
          <input type="input" className="form-control" id="deposit" placeholder="Enter Amount" value={withdraw} onChange={handleOnChange}/><br/>
          <button type="submit" className="btn btn-light" onClick={WithdrawAmount} disabled={disable}>Withdraw</button>
          <br/>
          <br/>
        </>
        )
        :
        (
              <>
              <br/>
              <h3>Success</h3>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make a new withdraw</button>
              </>
            )
        }
      />
    </>
    )
  }

  export default Withdraw;