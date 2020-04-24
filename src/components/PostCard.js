import React from 'react'
import Image from 'gatsby-image'
import styles from '../css/postcard.module.css'
import { Link } from 'gatsby'

const PostCard = ({ post }) => {
    const { title, date, author, slug } = post.frontmatter;
    const img = post.frontmatter.image.childImageSharp.fluid;
    console.log("<< PostCard: POST >>")
    console.log(post);
    console.log("<< Image >>")
    console.log(img)
    return <article className={styles.card}>
        <div>
            <Image fluid={img} />
        </div>
        <div className={styles.info}>
            <div>
                <h2>{title}</h2>
                <h6>
                    <span>by {author}</span> /
                    <span> {date}</span>
                </h6>
                <p>{post.excerpt}</p>
                <Link to={slug} class={styles.link}>Read more</Link>
            </div>
        </div>
    </article>

}

export default PostCard;
