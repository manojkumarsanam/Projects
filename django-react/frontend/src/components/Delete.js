import {React, useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import AxiosInstance from './Axios'
import { useNavigate, useParams } from 'react-router-dom'
const Delete = () => {
  const navigate = useNavigate()
  const [myData,setMyData] = useState()
  const [loading,setLoading] = useState(true)
  const myParams = useParams()
  const myId = myParams.id
  // const [loading,setLoading] = useState(true)
  const GetData = () => {
    AxiosInstance.get(`project/${myId}`).then((res) =>{
      setMyData(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }
  useEffect(()=>{
    GetData();
  },[])

  
  const submission = (data) => {
    AxiosInstance.delete(`project/${myId}/`)
    .then((res) =>{
      navigate(`/`)
    })
  }

  return (
    <div>
      {loading ? <p>Loading the deletion prompt...</p> :
      <div>
      <Box sx={{display:'flex',width:'100%',backgroundColor:'#00003f',marginBottom:'10px'}}>
        <Typography sx={{marginLeft:'20px',color:'#fff'}}>
          Deleting the records
        </Typography>

      </Box>
      <Box sx={{display:'flex',width:'100%',boxShadow:3,padding:4,flexDirection:'column'}}>
        <Box sx={{display:'flex',justifyContent:'space-around',marginBottom:'40px'}}>
          Are you sure you want to delete this project: {myData.name}
        </Box>
        <Box sx={{display:'flex',justifyContent:'space-around'}}>
          <Box sx={{width:'30%'}}>
              <Button variant='contained' type='submit' sx={{width:'100%'}} onClick={submission}> Delete this Project </Button>
          </Box>
        </Box>
      </Box>
    </div>
}
    </div>
  )
}

export default Delete