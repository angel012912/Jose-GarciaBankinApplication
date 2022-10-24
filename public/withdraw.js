//Cambiar el function handle para que cheque la informacion que esté en la bd

function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <SuccessMessage setShow={setShow} message="Withdraw again"/>}
    />
  )
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    console.log(email,amount);
    const user = ctx.users.find((user) => user.email == email);
    if (!user) {
      props.setStatus('fail!')      
      return;      
    }

    user.balance = user.balance - Number(amount);
    console.log(user);
    props.setStatus('');      
    props.setShow(false);
  }


  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
