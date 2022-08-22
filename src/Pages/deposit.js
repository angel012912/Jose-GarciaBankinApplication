import Card from './card';
import UserContext from '../Context/userContext';
import { useContext, useState } from 'react';

function Deposit()
{
  const ctx = useContext(UserContext);
  const [deposit, setDeposit] = useState(0);
  const [actualBalance, setActualBalance] = useState(ctx.users[0].balance);
  const [show, setShow] = useState(true);
  const [disable, setDisable] = useState(true);
  const [status, setStatus] = useState(`Balance Information: ${actualBalance}`);

  function DepositAmount(){
    ctx.users[0].balance = actualBalance + parseInt(deposit);
    setActualBalance(ctx.users[0].balance);
    setStatus(`Balance Information: ${ctx.users[0].balance}`);
    setShow(false);
  }

  function clearForm(){
    setDeposit('');
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
          setDisable(false);
        }else{
          setStatus('ERROR: You need to introduce a positive number');
          setDisable(true);
        }
      }else{        
        setDisable(true);
      }
    }
    setDeposit(e.currentTarget.value);
  }

  return (
    <>
      <Card
        bgcolor = "primary"
        header = "Deposit"
        status = {status}
        body = {show ? 
        (<>
          Amount of deposit<br/>
          <input type="input" className="form-control" id="deposit" placeholder="Enter Amount" value={deposit} onChange={handleOnChange}/><br/>
          <button type="submit" className="btn btn-light" onClick={DepositAmount} disabled={disable}>Deposit</button>
          <br/>
          <br/>
        </>
        )
        :
        (
              <>
              <br/>
              <h3>Success</h3>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make a new deposit</button>
              </>
            )
        }
      />
    </>
  )
}

  export default Deposit;