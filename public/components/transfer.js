function Transfer(){
    const {user} = React.useContext(UserContext);
    return(<>
        {user ? <TransferCard user={user} />: <><h1>You need to log in to see this information</h1><a  href="#">Return to home</a></>}
        </>);
}

function TransferCard(props){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    return (
        <Card bgcolor = "success" header="Transfer" status={status} body={ show ? <TransferForm setShow={setShow} setStatus={setStatus} user={props.user} /> : <SuccessMessage setShow={setShow} setStatus={setStatus} message="Make another transfer" />}/>
    );
}

function TransferForm(props){
    const [amount, setAmount] = React.useState('');
    const [balance, setBalance] = React.useState('');
    const [name, setName] = React.useState('');
    const [nameReceptor, setNameReceptor] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [formAmount, setFormAmount] = React.useState(false);
    const [disable, setDisable] = React.useState(true);
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
        if (email){
            if (email === props.user.email){
                setDisable(true);
                props.setStatus('You cannot make a transfer to yourself');
            }else{
                props.setStatus('');
                setDisable(false);
            }
        }else{
            setDisable(true);
        }
    }, [email]);

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

    function handleTransfer(){
        const url = `/transfer/${props.user.email}/${email}/${amount}`;
          (async ()=>{
            var res = await fetch(url);
            return res;
          })().then((data)=>{
            props.setShow(false);
            props.setStatus(`Your actual balance is: ${parseFloat(balance) - parseFloat(amount) }`);
          }).catch((e)=>{
            props.setStatus(`Error during the transfer`);
          });
    }

    function handleEmail(){
        const url = `/transfer/search/${email}`;
          (async ()=>{
            var res = await fetch(url);
            var data = await res.json();
            return data;
          })().then((data)=>{
            setFormAmount(true);
            setNameReceptor(data.name);
          }).catch((e)=>{
            props.setStatus(`Error: Cant find the user`);
          });
    }

    return(<>
        Hello {name}! <br/>
        Your actual balance is: ${balance}
        <br/>
        <br/>
        {!formAmount && 
        (<>Search the user 
        <input type="email" 
        className="form-control" 
        placeholder="Search by E-mail" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/>    
        <br/></>)}
        {!formAmount && (<button type="submit" 
        className="btn btn-light" 
        onClick={handleEmail} disabled={disable} >
            Search
        </button>)}
        {formAmount &&
            (
                <>
                    Transfer to {nameReceptor}
                    <br/>
                    Amount<br/>
                    <input type="number" 
                      className="form-control" 
                      placeholder="Enter amount" 
                      value={amount} 
                      onChange={e => setAmount(e.currentTarget.value)}/><br/>
                    <button type="submit" 
                      className="btn btn-light" 
                      onClick={handleTransfer}
                      disabled={disableAmount}>
                        Transfer
                    </button>
                </>
            )
        }
      </>);
}