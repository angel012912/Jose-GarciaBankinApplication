import React, {useContext} from 'react';
import UserContext from '../Context/userContext';



function AllData()
{
    var ctx = useContext(UserContext);
    ctx = ctx.users;
    var data = ctx.map((user, index) => {
        const {name, email, password, balance} = user;
        return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{password}</td>
            <td>{balance}</td>
        </tr>);
    });

    console.log(data);
    return(
        <div className='card'>
            <div className='card-body'>
                <h1 className='card-title'>All Data</h1>
                <table className='table table-striped'>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Password
                        </th>
                        <th>
                            Balance
                        </th>
                    </tr>
                    {data}
                </table>
            </div>
        </div>
    );
}

export default AllData;