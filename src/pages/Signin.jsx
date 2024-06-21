import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email required'),
    password: yup.string().min(6).required('Enter your password'),
})
    .required()

export default function Signin() {

    const navigate = useNavigate();

    

    const {
        register,
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:2210/api/v1/admin/signin", data, { withCredentials: true })
            console.log(data)
            console.log(res.data)
            
            if(res.data.success == true){
                toast.success(res.data)
                navigate('/movies')
            }else{
                toast.error(res.data.message)
            }
            
        } catch (error) {
            toast.error(res.data)
            console.log(error)
        }

    };

    return (
        <Box display={'flex'} height="100vh" sx={{ bgcolor: 'black' }} alignItems={'center'} justifyContent={'center'}>
            <Box bgcolor={'white'} height="80%" display={"flex"} borderRadius={'16px'} boxShadow={3} width={'30%'} justifyContent={'center'}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Admin
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1,width:'100%' }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                {...register("email")}
                                color='warning'
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register("password")}
                                color='warning'
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, ml:11, mb: 2, bgcolor: 'warning.main', width:200, justifyContent: 'center' }}
                            >
                                Sign In
                            </Button>
                            
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>

    )
}
