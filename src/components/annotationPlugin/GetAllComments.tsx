import React from 'react'
import { useSelector } from 'react-redux'

import { useEffect } from 'react'
import { fetchCommentsThunk } from '@/redux/slices/comments/commentThunk'
import { useRef } from 'react'
import { RootState } from '@/redux/store'
import { useAppDispatch } from '@/redux/store/hooks'

const GetAllComments = () => {
    const {isFetchedComments} = useSelector((state: RootState) => state.comments);
    const dispatch = useAppDispatch()
    const isApi = useRef<boolean>(false)
    useEffect(() => {
        if (!isFetchedComments && !isApi.current) {
            isApi.current = true;
            dispatch(fetchCommentsThunk()).unwrap()
        } else {
            isApi.current = false;
        }
    }, [isFetchedComments])
    return (
        null
    )
}

export default GetAllComments
