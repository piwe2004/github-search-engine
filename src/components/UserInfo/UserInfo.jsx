import { Avatar, Button, Card, CardContent, CircularProgress, Link, Typography } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { useGithubUserStore } from './../../store/githubUser';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UserInfo() {

    const {
        user: {
            avatar_url,
            name,
            html_url,
            company, 
            blog, 
            location:locationInfo,
            email, 
            hireable, 
            bio, 
            public_repos, 
            public_gists, 
            followers, 
            following, 
            created_at, 
            updated_at 
        }, 
        loading, 
        getUser 
    } = useGithubUserStore()

    const {username} = useParams()
    useEffect(() => {
        getUser(username)
    }, [username, getUser])

    const location = useLocation();
    const navigate = useNavigate();
    const onClickNavigateToList = useCallback(() => {
        if(!location.state) navigate('/');
        else{
            navigate({
                pathname:'/',
                search : !!location.state?.previous 
                    ? `?q=${location.state?.q}&page=${location.state?.previous}` 
                    : `?q=${location.state?.q}`
            })
        }
    }, [location.state, navigate])

    if(loading){
        return <CircularProgress sx={{margin:'200px auto 0'}} />
    }else{
        return (
            <>
                <Button style={{margin:'10px'}} onClick={onClickNavigateToList} startIcon={<ArrowBackIcon />}>목록</Button>
                <Card variant='outlined' sx={{ margin: '10px' }}>
                    <CardContent sx={{textAlign:'center'}}>
                        <Avatar alt={username} src={avatar_url ? avatar_url : ''} sx={{width:'200px', height:'200px', margin:'auto'}} />
                        <Typography variant='h4'sx={{marginBottom:'50px'}} >
                            {name}
                        </Typography>
                        <Button variant='contained' href={html_url} target='_blank' sx={{marginBottom:'30px'}}>GitHub Page</Button>
                        {bio ? <Typography variant='subtitle1'>자기소개 : </Typography> : null}
                        {company ? <Typography variant='subtitle1'>회사정보 : </Typography> : null}
                        {blog ? <Typography variant='subtitle1'>블로그 : <Link href={blog}>{blog}</Link></Typography> : null}
                        {locationInfo ? <Typography variant='subtitle1'>위치 : {locationInfo}</Typography> : null}
                        {email ? <Typography variant='subtitle1'>메일 : {email}</Typography> : null}
                        <Typography variant='subtitle1'>고용가능 여부 : {hireable ? "예" : "아니요"}</Typography>
                        <Typography variant='subtitle1'>public repository 개수 : {public_repos}</Typography>
                        <Typography variant='subtitle1'>public gists 개수 : {public_gists}</Typography>
                        <Typography variant='subtitle1'>팔로워 : {followers}</Typography>
                        <Typography variant='subtitle1'>팔로잉 : {following}</Typography>
                        <Typography variant='subtitle1'>GitHup 생성일 : {dayjs(created_at).format('YYYY.MM.DD h:mm A')}</Typography>
                        <Typography variant='subtitle1'>최근 GitHup 업데이트 : {dayjs(updated_at).format('YYYY.MM.DD h:mm A')}</Typography>
                    </CardContent>
                </Card>
            </>
        )
    }
}

export default UserInfo
