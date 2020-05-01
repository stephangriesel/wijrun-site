import React from 'react'
import PostCard from './PostCard';
import styles from '../css/postlist.module.css';
import logo from '../img/logo.png';
// import seo from '../components/seo';

const PostList = ({ posts }) => {
    console.log("<< PostList: POSTS >>")
    console.log(posts);
    return (
        <section className={styles.posts}>
            <div className={styles.header}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.center}>
                {posts.map(({ node }, index) => {
                    return <PostCard key={index} post={node} />
                })}
            </div>

        </section>
    )
}

export default PostList;
