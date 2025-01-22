import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    status: "all"
}


 export const fetchtodo = createAsyncThunk('taskstodo', async () =>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();

    return data.map(task => (
        {
            id: task.id,
            title: task.title,
            description: '',
            status: task.completed ? "Completed" : "Todo"
        }
    ))
 })


 const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask:(state,action) =>{
            state.tasks.push(action.payload)
        },
        deleteTask: (state,action) =>{
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },

        editTask:(state,action) => {
            const { id, title} = action.payload;
            state.tasks = state.tasks.map( (task) => (
                task.id === action.payload.id ? action.payload : ''
            ))
        }
    },

    
    extraReducers: (builder) => {
        builder.addCase(fetchtodo.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchtodo.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        });

        builder.addCase(fetchtodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
 })
 export const {addTask,deleteTask,editTask} = taskSlice.actions;
 export default taskSlice.reducer;