import './App.css';
import { useEffect, useState } from 'react'
import {Card, Modal} from 'antd'
import axios from 'axios';
import Add from './Components/Add';
import Delete from './Components/Delete';
import Edit from './Components/Edit';
function App() {

  const [users, setusers] = useState([]);
  const [open, setOpen] = useState(false);

  // To store fetched data(ie link and name) while clicking a card
  const [data, setData] = useState('');
  const [dataName, setDataName] = useState('');


  useEffect(()=>{
    axios.get('http://localhost:3031/users')
    .then(response=>{setusers(response.data)})
    .catch(error=>{console.log(error)})
  },[]);


  // const showModal = (link) => {
  //   // setData(link + 'autoplay=1&mute=1');
  //   setOpen(true);
  // };

  const handleCancel = () => {
    setOpen(false);
  };


  function replace(){
        // setData( data + '&autoplay=1')
        if(data.includes('watch?v='))
          setData(data.replace('watch?v=','embed/'))
  }


  return (
    <div className="App">
      <div className='container'>
        <header>Convin Frontend Assignment</header>
        <div className='card'>
          {users.map((user, index)=>{
            return(
              <div key={index}>
                  <Card title={user.name} 
                        bordered={true} 
                        style={{ width: 400, height: 150 }} 
                        className ='eachcard' 
                        onClick={()=>{setData(user.link);
                                        replace();
                                        setOpen(true);
                                        setDataName(user.name)}}>
                      <p>Link: {user.link} </p>
                  </Card> 
              </div>
            )
          })}
        </div>


        <div className='controls'>
          <Add />       
          <Edit/>
          <Delete/>
        </div>


        <Modal title={dataName}
               open={open}
               onCancel={handleCancel}
               okButtonProps={{ style: { display: 'none' } }}
               cancelButtonProps={{ style: { display: 'none' } }}> 
                <iframe title='Video/mp3 Link'
                        src={data}>
                </iframe>
        </Modal>
      </div>
    </div>
  );
}

export default App;
