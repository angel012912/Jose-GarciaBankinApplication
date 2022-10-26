function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const {setUser, setShowSuccess} = React.useContext(UserContext);

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setStatus={setStatus} setUser={setUser} setShowSuccess={setShowSuccess} /> : 
        <SuccessMessage setShow={setShow} message="Add another account"/>}
    />
  )
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    props.setStatus('');
  }

  function handle(){
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(
      email,
      password
    );
    promise.then((user)=>{
      const url = `/account/create/${name}/${email}`;
      (async ()=>{
        var res = await fetch(url);
        var data = await res.json();
      })();
      props.setShow(false);
      props.setUser(user);
      props.setShowSuccess(true);
    }).catch((e) =>{
      props.setStatus('ERROR - Check if is a valid email or if its already registered');
      setTimeout(()=>{clearForm()}, 2000);
    }); 
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
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

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}

function SuccessCreate(){
  return(
    <div class="alert alert-success" role="alert">
     Account Created Successfully
    </div>
  );
}