function NavBar(){
  const {user, setUser} = React.useContext(UserContext);

  return(
    (user  && <NavBarUser setUser={setUser} user={user}/>
    )
  );
}

function NavBarUser(props){
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a className="navbar-brand" href="#">BadBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/withdraw/">Withdraw</a>
            </li>
            <li>
              <a className="nav-link" href="#/transfer">Transfer</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/transactions/">Transactions</a>
            </li>   
            <li className="nav-item">
              <button className="nav-link btn" href="#" onClick={(e)=>{
                firebase.auth().signOut();
                props.setUser(null)
                }}>LogOut</button>
            </li>       
          </ul>
        </div>
        <span className="navbar-text">
            {props.user.email} 
        </span>
      </div>
    </nav>
  );
}
