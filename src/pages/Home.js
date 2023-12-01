import React, { useEffect , useState} from 'react'

import Button from "@mui/material/Button";
import Box from '@mui/material/Box'
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate()

  const[loading, setLoading] = useState(true) 
  const[dataApi, setDataApi] = useState([])

  var dataRegisterLocal = JSON.parse(localStorage.getItem("dataRegister"))

  useEffect(()=> {
    if(!dataRegisterLocal) {
      navigate("/register")
    }
    try {
      const res = axios.get("https://6569da7fde53105b0dd7c4bb.mockapi.io/users")
    res.then((data) => setDataApi(data.data))
    setTimeout(function() {
        setLoading(false)
      }, 3000)
    }catch(error){
      console.log(error)
    }
      
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("dataRegister")
    navigate("/register")
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'email',
      headerName: "Email",
      width: 160,
    },
    {
      field: 'address',
      headerName: "Address",
      width: 160,
    }
  ];

  
  return (
    <>
    {
    loading ? <Box sx= {{display:"flex", justifyContent:"center", margin:"25%"}}><CircularProgress /></Box> :
    <>
    <Box sx= {{display:"flex", justifyContent:"flex-end", alignItems:"center", padding:"20px"}}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Typography sx={{marginRight:"40px", marginLeft:"15px"}}>{dataRegisterLocal.firstName + dataRegisterLocal.lastName}</Typography>
    <Button onClick = {handleLogout} variant="contained">Log Out</Button>
  </Box>
  <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        // rows={rows}
        rows = {dataApi}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </>
  }
    
    </>
  )
}

export default Home