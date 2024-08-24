import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { user_api } from './services/user_api';
import { blog_api } from './services/blog_api';
import { comment_api } from './services/comment_api';

const store = configureStore({
    reducer: {
        [user_api.reducerPath]: user_api.reducer,
        [blog_api.reducerPath]: blog_api.reducer,
        [comment_api.reducerPath]: comment_api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(user_api.middleware)
            .concat(blog_api.middleware)
            .concat(comment_api.middleware)
});

setupListeners(store.dispatch);

export default store;