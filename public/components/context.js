const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext({
  user: null,
  setUser: (user)=>{},
});

 // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ3835U_Jlhi5W-73otf2CrQokSFlw3hg",
  authDomain: "courso-ae0a8.firebaseapp.com",
  databaseURL: "https://courso-ae0a8-default-rtdb.firebaseio.com",
  projectId: "courso-ae0a8",
  storageBucket: "courso-ae0a8.appspot.com",
  messagingSenderId: "738415398619",
  appId: "1:738415398619:web:eb4d2382d41e550b7206fe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }
  function styles(){
    const styles = props.style ? props.style : {maxWidth: "18rem"};
    return styles;
  }

  return (
    <div className={classes()} style={styles()}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>      
  );    
}

function SuccessMessage(props){
  return(
    <>
      <h5>Success</h5>
      <button type="submit" className="btn btn-light" onClick = {() => {props.setShow(true); props.setStatus('');}}>{props.message}</button> 
    </>
  );
};

