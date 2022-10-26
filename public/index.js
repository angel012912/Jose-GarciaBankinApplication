function Spa() {
  const [user, setUser] = React.useState(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  if (showSuccess){
    setTimeout(()=>{
      setShowSuccess(false)
    }, 2500);
  }
  return (
    <HashRouter>
      <div>
        <UserContext.Provider value={{user, setUser, setShowSuccess}}>
        <NavBar/>        
        {showSuccess && <SuccessCreate/>}
          <div className="container" style={{padding: "20px", width: "100%", height: "100%"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount}/>
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/transactions/" component={Transactions} /> 
            <Route path="/transfer/" component={Transfer}/> 
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
