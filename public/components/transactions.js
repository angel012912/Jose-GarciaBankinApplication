function Transactions(){
  const {user} = React.useContext(UserContext);
    return(<>
    {user ? <> <h1 style={{textAlign: "center"}}>Transactions</h1> <br/> <Table user={user} /> </>: <><h1>You need to log in to see this information</h1><a  href="#">Return to home</a></>}
    </>);
}

function Table(props){
  const [transactions, setTransactions] = React.useState();
  const [rows, setRows] = React.useState();
  const [balance, setBalance] = React.useState();

  function useRegex(input) {
    let regex = /from/i;
    return regex.test(input);
  }

  if(!balance){
    let url = `account/info/${props.user.email}`;
    (async()=>{
      var res = await fetch(url);
      var data = await res.json();
      return data;
    })().then((data, err)=>{
        setBalance(data.balance);
      }
    );
  }

  let url = `/transactions/${props.user.email}`;
  if (!transactions){
    (async()=>{
      var res = await fetch(url);
      var data = await res.json();
      return data;
    })().then((data)=>{
        setTransactions(data);
      }
    );
  }else{
    if (!rows){
      let row = transactions.map((transaction, index)=>{
        let type = transaction.type == 'deposit' || useRegex(transaction.type);  
        let classes = type ? "table-success" : "table-danger"; 
        return(
          <tr key={index} className={classes}>
            <th scope="row">{index + 1}</th>
            <td>{transaction.type.toUpperCase()}</td>
            <td>{type ? '+' : '-'}{transaction.amount}</td>
          </tr>
        ); 
      });
      setRows(row);
    }
  } 

  return (
  <table className="table table-hover" style={{textAlign: "right"}}>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Type</th>
        <th scope="col">Amount</th>
      </tr>
    </thead>
    <tbody>
      {rows}
      <tr>
        <th></th>
        <th></th>
        <th>
          <h5>Balance ${balance}</h5>
        </th>
      </tr>
    </tbody>
  </table>
);
}