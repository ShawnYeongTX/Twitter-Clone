// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';

// const BASE_URL = 'https://91b8f362-6769-4c24-9f3a-a3f50858e94b-00-1xltvnylqob4.pike.replit.dev';

// export const fetchPostsByUser = createAsyncThunk(
//     "posts/fetchByUser",
//     async (userId) => {
//         const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
//         return response.json()
//     }
// );

// export const savePost = createAsyncThunk(
//     "posts/savePost",
//     async (postContent) => {
//         const token = localStorage.getItem("authToken");
//         const decode = jwtDecode(token);
//         const userId = decode.id;

//         const data = {
//             title: "Post Title",
//             content: postContent,
//             user_id: userId,
//         };
//         const response = await axios.post(`${BASE_URL}/posts`, data)
//         return response.data
//     }
// );

// const postsSlice = createSlice({
//     name: "posts",
//     initialState: { posts: [], loading: true },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
//             state.posts = action.payload;
//             state.loading = false;
//         })
//         builder.addCase(savePost.fulfilled, (state, action) => {
//             state.posts = [action.payload, ...state.posts];
//         })
//     },
// });

// export default postsSlice.reducer














import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const BASE_URL = 'https://91b8f362-6769-4c24-9f3a-a3f50858e94b-00-1xltvnylqob4.pike.replit.dev';

export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
);

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            console.log("Retrived token:", token);
            if (!token) {
                throw new Error("No auth token found");
            }

            const decode = jwtDecode(token);
            console.log("Decoded token:", decode);
            if (!decode || !decode.id) {
                throw new Error("Invalid token");
            }

            const userId = decode.id;

            const data = {
                title: "Post Title",
                content: postContent,
                user_id: userId,
            };
            const response = await axios.post(`${BASE_URL}/posts`, data);
            return response.data;
        } catch (error) {
            console.error("Error saving post:", error.response ? error.response.data : error.message);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsByUser.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(savePost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(savePost.rejected, (state, action) => {
                console.error("Failed to save post:", action.payload);
            });
    }
});

export default postsSlice.reducer;