
function Balance(){
  const [status, setStatus] = React.useState('');  
  const {user} = React.useContext(UserContext);

  return (
  <div style={{margin: "auto auto"}}>
    {user ? <Card bgcolor="info" header="Balance" status={status} body={
    <BalanceForm setStatus={setStatus} user={user} /> } />:
    <><h1>You need to log in to see this information</h1><a  href="#">Return to home</a></>
    }
  </div>
  );
}

function BalanceForm(props){
  const [name, setName] = React.useState();
  const [balance, setBalance] = React.useState();

  if(!balance && !name){
    let url = `account/info/${props.user.email}`;
    (async()=>{
      var res = await fetch(url);
      var data = await res.json();
      return data;
    })().then((data, err)=>{
        setName(data.name);
        setBalance(data.balance);
      }
    );
  }

  return (<>

    Hi {name}!
    <br/>
    Your actual balance is ${balance}

  </>);
}