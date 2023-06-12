import { CircularProgress, Grid, Pagination } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGithubUsersStore } from '../../store/githubUsers'
import UserItem from '../UserItem/UserItem'

function UserGrid() {

    const [searchParams, setSearchParams] = useSearchParams({})
    const {users, totalCount, loading, searchUsers} = useGithubUsersStore();
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        const query = searchParams.get("q")
        const page = searchParams.get('page');
        if(!query) return;
        searchUsers(query, page )
    }, [searchParams, searchUsers])

    const totalPageCount = useMemo(()=> {
        const pageCount = Math.ceil(totalCount / 20)
        return pageCount > 50 ? 50 : pageCount
    }, [totalCount]);

    const handleChangePage = useCallback((e, number) => {
        setSearchParams({q:searchParams.get('q'), page:number })
    }, [searchParams, setSearchParams])

    useEffect(()=>{
        const page = searchParams.get('page') ?? 1;
        setCurrentPage(parseInt(page))

    }, [searchParams])

    if(loading){
        return <CircularProgress sx={{margin:'200px auto 0',}} size={100} />
    }else{
        return (
            <>
                <Grid
                    container
                    spacing={{xs:2, sm:2, md:2}}
                    columns={{xs:2, sm:3, md:4}}
                    sx={{padding:"10px"}}                
                >
                    {users.map((user, idx)=>(
                        <Grid item xs={1} sm={1} md={1} key={idx} >
                            <UserItem user={user} />
                        </Grid>
                    ))}
                </Grid>
                {totalCount !== 0 ? 
                <Pagination 
                    sx={{margin:'auto'}} 
                    page={currentPage} 
                    count={totalPageCount}
                    color='primary'
                    onChange={handleChangePage}
                />
                : null}
            </>
        )
    }
}

export default UserGrid
