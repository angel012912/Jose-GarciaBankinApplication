//Cambiar el function handle para que cheque la informacion que esté en la bd

function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');   
  const {setUser} = React.useContext(UserContext); 

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} setUser={setUser}/> :
        <SuccessMessage setShow={setShow} message="Authenticate again"/>}
    />
  ) 
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');


  function handle(){
    const auth  = firebase.auth();      
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch((e) => {
      props.setStatus(e.message);
      setEmail('');
      setPassword('');
    });
  }

  function handleGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser){
      if (firebaseUser.displayName){
        (async()=>{
          var res = await fetch(`/check/${firebaseUser.email}/${firebaseUser.displayName}`);
          return res;
        })();
      }
      props.setUser(firebaseUser);
      props.setShow(false);
    }
  });

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
    <br/>
    <br/>
    <button type="submit" className="btn btn-sm btn-light" onClick={handleGoogle}>Login w/Google</button>
  
  </>);
}