import {React, useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyMultilineField from './forms/MyMultilineField'
import MyDatePickerField from './forms/MyDatePickerField'
import MySelectField from './forms/MySelectFeild'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'
const Edit = () => {
  const navigate = useNavigate()
  const myParams = useParams()
  const myId = myParams.id
  const [projectmanager,setProjectmanager] = useState()
  const [loading,setLoading] = useState(true)

  const hardcoded_options = [
    {id:'',name:'None'},
    {id:'Open',name:'Open'},
    {id:'In Progress',name:'In Progress'},
    {id:'Completed',name:'Completed'},
  ]

  const GetData = () => {
    AxiosInstance.get(`projectmanager/`).then((res) =>{
      setProjectmanager(res.data)
      console.log(res.data)
    })
    AxiosInstance.get(`project/${myId}`).then((res) =>{
      console.log(res.data)
      setValue('name',res.data.name)
      setValue('status',res.data.status)
      setValue('projectmanager',res.data.projectmanager)
      setValue('comments',res.data.comments)
      setValue('start_date',Dayjs(res.data.start_date))
      setValue('end_date',Dayjs(res.data.end_date))
      setLoading(false)
    })
  }
  useEffect(()=>{
    GetData();
  },[])

  const defaultValues = {
    name : '',
    comments : '',
    status : '',
}
  const {handleSubmit, setValue, control} = useForm({defaultValues:defaultValues})
  const submission = (data) => {
    const StartDate = Dayjs(data.start_date['$d']).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date['$d']).format("YYYY-MM-DD")
    AxiosInstance.put(`project/${myId}/`,{
      name: data.name,
      status: data.status,
      projectmanager: data.projectmanager,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    })
    .then((res) =>{
      navigate(`/`)
    })
  }

  return (
    <div>
    {loading ? <p>Loading Editable data...</p> :
    <form onSubmit={handleSubmit(submission)}>
    
      <Box sx={{display:'flex',width:'100%',backgroundColor:'#00003f',marginBottom:'10px'}}>
        <Typography sx={{marginLeft:'20px',color:'#fff'}}>
          Create records
        </Typography>

      </Box>
      <Box sx={{display:'flex',width:'100%',boxShadow:3,padding:4,flexDirection:'column'}}>
        <Box sx={{display:'flex',justifyContent:'space-around',marginBottom:'40px'}}>
          <MyTextField
          width={'30%'}
          label="Name"
          name="name"
          control={control}
          placeholder="Provide a project name"
          />
          <MyDatePickerField
          width={'30%'}
          label="Start date"
          name = "start_date"
          control={control}
          />
          <MyDatePickerField
          width={'30%'}
          label="End date"
          name = "end_date"
          control={control}
          />
        </Box>
        <Box sx={{display:'flex',justifyContent:'space-around',marginBottom:'30px'}}>
          <MyMultilineField
          width={'30%'}
          label="Comments"
          name="comments"
          control={control}
          placeholder="Provide project comments"
          />
          <MySelectField
          label="Status"
          name = "status"
          width={'30%'}
          control={control}
          options={hardcoded_options}
          />
          <MySelectField
          label="Project Manager"
          name = "projectmanager"
          width={'30%'}
          control={control}
          options={projectmanager}
          />
          
        </Box>
        <Box sx={{display:'flex',justifyContent:'start'}}>
          <Button variant='contained' type='submit' sx={{width:'30%'}}> Submit </Button>
        </Box>
      </Box>
      
    
    </form>}
    </div>
  )
}

export default Edit