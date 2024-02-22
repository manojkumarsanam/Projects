import React from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyMultilineField from './forms/MyMultilineField'
import MyDatePickerField from './forms/MyDatePickerField'
import MySelectField from './forms/MySelectFeild'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
const Create = () => {
  const navigate = useNavigate()
  const defaultValues = {
    name : '',
    comments : '',
    status : '',
}
  const {handleSubmit, control} = useForm({defaultValues:defaultValues})
  const submission = (data) => {
    const StartDate = Dayjs(data.start_date['$d']).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date['$d']).format("YYYY-MM-DD")
    AxiosInstance.post(`project/`,{
      name: data.name,
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
    <form onSubmit={handleSubmit(submission)}>
    <div>
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
        <Box sx={{display:'flex',justifyContent:'space-around'}}>
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
          />
          <Box sx={{width:'30%'}}>
              <Button variant='contained' type='submit' sx={{width:'50%'}}> Submit </Button>
          </Box>
        </Box>
      </Box>
    </div>
    </form>
  )
}

export default Create