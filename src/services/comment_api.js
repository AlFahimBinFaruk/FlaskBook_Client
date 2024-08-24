import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


export const comment_api = createApi({
    reducerPath: 'comment_api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {


            const token = localStorage.getItem("token");
            // getState().auth.token ||
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            headers.set("Content-Type", "application/json");

            return headers;
        }
    }),
    tagTypes: ["Comment"],
    endpoints: (builder) => ({



        createNewComment:builder.mutation({
            query:(data)=>({
                url:"/comment/add-new",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Comment"]
        }),

        getAllCommentList:builder.query({
            query:({blog_id,page})=>({
                url:`/comment/all/${blog_id}?page=${page}`,
                method:"GET"
            }),
            providesTags:["Comment"]
        }),

        


        deleteComment:builder.mutation({
            query:(id)=>({
                url:`/comment/delete/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Comment"]
        })



        
    }),
});

export const {
    
    useGetAllCommentListQuery,
    useCreateNewCommentMutation,
    useDeleteCommentMutation
   
    

} = comment_api;