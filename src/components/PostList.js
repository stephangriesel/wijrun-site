import React from 'react'
import PostCard from './PostCard';
import styles from '../css/postlist.module.css';

const PostList = ({ posts }) => {
    console.log("<< PostList: POSTS >>")
    console.log(posts);
    return (
        <section className={styles.posts}>
            <h1>Pieter Piet</h1>
            <h4>Some text</h4>
            <div className={styles.center}>
                {posts.map(({ node }, index) => {
                    return <PostCard key={index} post={node} />
                })}
            </div>

        </section>
    )
}

export default PostList;
