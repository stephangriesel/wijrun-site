import React from 'react'
import img from 'gatsby-image'
import styles from '../css/postcard.module.css'
import { Link } from 'gatsby'

const PostCard = ({ post }) => {
    const { title, date, author, slug } = post.frontmatter;
    const img = post.frontmatter.image.childImageSharp.fluid;
    console.log("<< PostCard: POST >>")
    console.log(post);
    console.log("<< Image >>")
    // console.log(img)
    return (
        <div>
            <h1>Postcard</h1>
        </div>
    )
}

export default PostCard;
