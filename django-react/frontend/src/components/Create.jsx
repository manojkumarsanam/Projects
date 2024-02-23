import {React, useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyMultilineField from './forms/MyMultilineField'
import MyDatePickerField from './forms/MyDatePickerField'
import MySelectField from './forms/MySelectFeild'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
const Create = () => {
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
      setLoading(false)
    })
  }
  useEffect(()=>{
    GetData();
  },[])

  const navigate = useNavigate()
  const defaultValues = {
    name : '',
    comments : '',
    status : '',
}

  const schema = yup
  .object({
    name: yup.string().required('Name is a required field'),
    projectmanager: yup.string().required('Project Manager is a required field'),
    status: yup.string().required('Status is a required field'),
    comments: yup.string(),
    start_date: yup.date().required('Start date is a required field'),
    end_date: yup.date().required('End date is a required field').min(yup.ref('start_date'),'The end date cannot be before the start date')
  })
  const {handleSubmit, control} = useForm({defaultValues:defaultValues, resolver: yupResolver(schema)})
  const submission = (data) => {
    const StartDate = Dayjs(data.start_date['$d']).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date['$d']).format("YYYY-MM-DD")
    AxiosInstance.post(`project/`,{
      name: data.name,
      projectmanager: data.projectmanager,
      status: data.status,
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
    {loading ? <p>Loading data...</p> :
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

export default Create