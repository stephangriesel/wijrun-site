import React from 'react'
import PostCard from './PostCard';
import styles from '../css/postlist.module.css';

const PostList = ({ posts }) => {
    console.log("<< PostList: POSTS >>")
    console.log(posts);
    return (
        <div>
            <h1>Postlist</h1>
            <PostCard />
        </div>
    )
}

export default PostList;
