import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { todoApi } from '../api/api'
import { Todo } from '../constants/types'

interface ItemsState {
    items: Todo[]
    isFetching: boolean
}

const initialState: ItemsState = {
    items: [],
    isFetching: false,
}

export const fetchData = createAsyncThunk<any>(
    'items/fetchData',
    async () => {
        return await todoApi.getData()
    }
)

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        todoAdded: (state, action) => {
            state.items = [action.payload, ...state.items]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isFetching = true
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isFetching = false
                state.items = action.payload
            })
    },
})

export const { todoAdded } = itemsSlice.actions
export default  itemsSlice.reducer
