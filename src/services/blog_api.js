import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


export const blog_api = createApi({
    reducerPath: 'blog_api',
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
    tagTypes: ["Blog"],
    endpoints: (builder) => ({



        createNewBlog:builder.mutation({
            query:(data)=>({
                url:"/blog/add-new",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Blog"]
        }),

        getAllBlogList:builder.query({
            query:({page})=>({
                url:`/blog/all?page=${page}`,
                method:"GET"
            }),
            providesTags:["Blog"]
        }),

        getBlogDetails:builder.query({
            query:(id)=>({
                url:`/blog/details/${id}`,
                method:"GET"
            }),
            providesTags:["Blog"]
        }),


        updateBlog:builder.mutation({
            query:({id,...data})=>({
                url:`/blog/update/${id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["Blog"]
        }),

        

        upVote:builder.mutation({
            query:(blog_id)=>({
                url:`/vote/upvote/${blog_id}`,
                method:"POST"
            }),
            invalidatesTags:["Blog"]
        }),

        downVote:builder.mutation({
            query:(blog_id)=>({
                url:`/vote/downvote/${blog_id}`,
                method:"POST"
            }),
            invalidatesTags:["Blog"]
        })



        
    }),
});

export const {
    
    useCreateNewBlogMutation,
    useGetAllBlogListQuery,
    useGetBlogDetailsQuery,
    useUpdateBlogMutation,
    useUpVoteMutation,
    useDownVoteMutation

} = blog_api;