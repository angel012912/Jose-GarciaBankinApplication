function Home(){
  const ctx = React.useContext(UserContext);
  return (
    <>
      <div style={{width: "100%"}}>
        <h1 style={{textAlign: "center"}}>BadBank</h1>
        <div style={{display: "flex"}}>
          <Card
            txtcolor="black"
            header="Welcome to the best bank"
            title="You will feel safer than ever!"
            body={(<img src="../assets/bank.jpeg" className="img-fluid" alt="Responsive image" width="500px" />)}
            style={{width: "100%", textAlign: "center"}} />
          {!ctx.user && <CreateAccount/>}
          {!ctx.user && <Login/>}
        </div>
      </div>
    </>
  );  
}
