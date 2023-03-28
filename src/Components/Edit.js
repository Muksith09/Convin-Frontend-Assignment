import React, { useState } from 'react'
import { Button, Space, Input, Modal } from 'antd'
import axios from 'axios';
// import './App.css';

function Edit() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataName, setdataName] = useState('');
    const [dataLink, setdataLink] = useState('');
    const [data, setdata] = useState({name:'',link:''});
    const showModal = () => {
        setIsModalOpen(true);
    };
  
    const handleOk = () => {
        setdata({
            name:{dataName},
            link:{dataLink}
        })
        console.log(data.name)
        console.log(data.link)
        axios.post('http://localhost:3031/users', data)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        setIsModalOpen(false);
    };
  
    const handleCancel = () => {
        setIsModalOpen(false);
    };


  return (
    <>
      <>
          <Space wrap>
            <Button onClick={showModal}>Edit Card</Button>
          </Space>
            <Modal title="Edit Card" 
                    open={isModalOpen} 
                    onOk={handleOk}
                    onCancel={handleCancel}>
                Name: <Input name='name' 
                        value={dataName} 
                        onChange={(e)=>{setdataName(e.target.value)}}
                         placeholder="firstname lastname "  />
                Link: <Input name='link' 
                        value={dataLink} 
                        onChange={(e)=>{setdataLink(e.target.value)}} 
                        placeholder="https://xyz" />
            </Modal>
        </>
    </>
  )
}

export default Edit
