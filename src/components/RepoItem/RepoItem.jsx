import React from 'react'
import { Card, CardContent, Link, Typography } from '@mui/material'
import dayjs from 'dayjs'
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';

function RepoItem({repo:{html_url, name, update_at, language, watchers_count, stargazers_count, forks}}) {
    return (
        <Card variant='outlined' sx={{margin:'10px'}}>
            <CardContent>
                <Link href={html_url} target='_blank' underline='none' sx={{fontSize:'50px'}} >{name}</Link>
                <div style={{marginTop:'10px'}}>
                    <Typography variant='subtitle2' display='inline'>
                        최근 업데이트 날짜 : {dayjs(update_at).format('YYYY.MM.DD h:mm A') }
                    </Typography>
                    {
                        language 
                            ? <Typography variant='subtitle2' display='inline' sx={{paddingLeft:'20px'}}>
                                Language : {language}
                            </Typography> 
                            : null
                    }
                </div>
                <div style={{marginTop:'10px', display:'flex', alignItems:'center', gap:'20px'}}>
                    <Typography style={{display:'flex', alignItems:'center', gap:'5px'}} >
                        <VisibilityIcon sx={{fontSize:'15px'}} /> {watchers_count}
                    </Typography>
                    <Typography style={{display:'flex', alignItems:'center', gap:'5px'}} >
                        <StarIcon sx={{fontSize:'15px'}} />{stargazers_count}
                    </Typography>
                    <Typography style={{display:'flex', alignItems:'center', gap:'5px'}} >
                        forks : {forks}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default RepoItem
