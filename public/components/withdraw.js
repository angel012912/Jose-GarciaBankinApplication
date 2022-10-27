//Cambiar el function handle para que cheque la informacion que esté en la bd

function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const {user} = React.useContext(UserContext);

  return (
    <>
      {
        user ? 
          <Card
          bgcolor="success"
          header="Withdraw"
          status={status}
          body={show ? 
          <WithdrawForm setShow={setShow} setStatus={setStatus} user={user} /> :
          <SuccessMessage setShow={setShow} setStatus={setStatus} message="Withdraw again"/>}
          />: 
          <><h1>You need to log in to see this information</h1><a  href="#">Return to home</a></>
      }
    </>
    
  )
}

function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [name, setName] = React.useState('');
  const [disableAmount, setDisableAmount] = React.useState(true);

  React.useEffect(()=>{
    let url = `/account/info/${props.user.email}`;
    (async()=>{
      var res = await fetch(url);
      var data = await res.json();
      setBalance(data.balance);
      setName(data.name);
    })();
  },[balance]);

  React.useEffect(()=>{
    if(amount){
      if (amount < 0){
        setDisableAmount(true);
        props.setStatus('Error - You need to introduce a positive amount');
      }else if (balance - amount < 0){
        setDisableAmount(true);
        props.setStatus('Error - You cannot overpass your balance');
      }
      else{
        setDisableAmount(false);
        props.setStatus('');
      }
    }else{
      setDisableAmount(true);
    }
  }, [amount]);

  function handle(){
    const url = `/account/transaction/${props.user.email}/withdraw/${amount}`;
      (async ()=>{
        var res = await fetch(url);
        var data = await res.json();
      })().then(()=>{
        props.setShow(false);
        props.setStatus(`Your new balance is: ${parseFloat(balance) - parseFloat(amount)}`);
      });
  }


  return(<>
    Hello {name}! <br/>
    Your actual balance is: ${balance}
    <br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}
      disabled={disableAmount}
      >
        Withdraw
    </button>

  </>);
}
