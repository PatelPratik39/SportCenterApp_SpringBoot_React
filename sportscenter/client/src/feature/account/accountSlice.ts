import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from 'react-hook-form';
import api from "../../app/api/api";
import { router } from "../../app/router/route";
import { toast } from "react-toastify";


interface AccountState {
    user: User | null;
    error: string | null;
}

const initialState :  AccountState = {
    user: null,
    error: null
}

export const sigInUser = createAsyncThunk<User, FieldValues>(
    'auth/login',
    async(data, thunkAPI) => {
        try {
            const user = await api.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User | null>(
    'auth/fetchCurrentUser',
    async(_, thunkAPI) => {
        try{
            const userString = localStorage.getItem('user');
            if(userString){
                const user = JSON.parse(userString) as User;
                return user;
            }
            return null;
        }
        catch(error){
            console.error('Error Fetching current User : ', error);
            return null;
        }
    }
)

export const logoutUser = createAsyncThunk<void>(
    'auth/logout',
    async( _, thunkAPI) => {
        try {
            // Remove User from local storage
            localStorage.removeItem('user');
        } catch (error) {
            console.error("Error Logging Out User ");
            
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers:{
        logout:(state) =>{
            state.user = null;
            state.error = null;
            localStorage.removeItem('user');
            router.navigate('/');
        }, clearError:(state) => {
            state.error = null;
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(sigInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
            state.error = null;
            toast.success('Sign in Successfull!!!');
        });
        builder.addMatcher(isAnyOf(sigInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
            const payload = action.payload as string | null;
            state.error = payload;
            toast.success('Sign in Failed, Please try Again !!!');
        })
    })
})

export const {logout, clearError} = accountSlice.actions;