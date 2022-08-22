import Card from './card';
import Image from '../Assets/bankG.gif';

function Home(){
    return (
      <Card
        txtcolor="center"
        header="The Worst Bank"
        title="Welcome to the worst bank, where none of your information is actually stored"
        body={(<img src = {Image} className="img-fluid" alt="Responsive image"/>)}
      />    
    );  
  }

export default Home;