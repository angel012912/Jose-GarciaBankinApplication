function Card(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <div className={classes()} style={{maxWidth: "15rem align-center"}}>
        <div className="card-header" style={{fontSize: "30px"}}>{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
        </div>
      </div>      
    );    
  }

export default Card;