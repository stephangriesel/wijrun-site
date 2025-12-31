import React from 'react'
import PostCard from './PostCard';
import styles from '../css/postlist.module.css';
const PostList = ({ posts }) => {
    return (
        <section className={styles.posts}>
            <div className={styles.header}>
                <img src="/logo.png" alt="logo" />
            </div>
            <div className={styles.center}>
                {posts.map((post, index) => {
                    return <PostCard key={index} post={post} />
                })}
            </div>

        </section >
    )
}

export default PostList;
