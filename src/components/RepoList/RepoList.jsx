import { Button, CircularProgress, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useGithubReposStore } from '../../store/githubRepos'
import { useParams } from 'react-router-dom'
import RepoItem from '../RepoItem/RepoItem'

function RepoList() {

    const {username} = useParams()
    const [page, setPage] = useState(1)
    const {repos, loading, isEnd, getRepos, resetRepos} = useGithubReposStore()

    useEffect(()=>{
        getRepos(username, page)
    }, [username, page, getRepos])

    useEffect(()=>{
        return() => {
            resetRepos();
        }
    },[resetRepos])

    const loadMore = useCallback(() => setPage((prePage) => prePage +1), [])

    return (
        <>
            {repos.length > 0 ?
                <Typography variant='h4' textAlign="center">
                    Github Repository List
                </Typography> : null
            }
            {
                repos.map((repo, idx) => <RepoItem repo={repo} key={idx} />)
            }
            {
                loading 
                ? <CircularProgress sx={{margin:'auto'}} size={50} /> 
                : isEnd 
                    ? null 
                    : <Button style={{margin:'10px'}} onClick={loadMore}>Load More</Button>
            }
        </>
    )
}

export default RepoList
