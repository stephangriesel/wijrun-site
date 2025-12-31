import React from 'react'
import styles from '../css/postcard.module.css'

const PostCard = ({ post }) => {
    const { title, date, author, heroImage, image, pubDate, description } = post.data;
    const { optimizedImage } = post;
    const slug = post.slug || post.id;
    const img = heroImage || image;

    // Format date
    const formattedDate = (pubDate || date) ? new Date(pubDate || date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: '2-digit'
    }).replace(/ /g, ' ').replace(',', '') + "'" : ''; // Attempt to match "D MMMM 'YY" format

    return <article className={styles.card}>
        <div>
            {optimizedImage ? (
                <img src={optimizedImage.src} {...optimizedImage.attributes} alt={title} loading="lazy" />
            ) : (
                img && <img src={img.src} alt={title} loading="lazy" />
            )}
        </div>
        <div className={styles.info}>
            <div>
                <h2>{title}</h2>
                <h6>
                    <span>by {author}</span> /
                    <span> {formattedDate}</span>
                </h6>
                <p>{description || post.body.replace(/^import .*/gm, '').replace(/<[^>]*>?/gm, '').replace(/[#*`_]/g, '').trim().substring(0, 100)}...</p>
                <a href={`/${slug}`} className={styles.link}>Read more</a>
            </div>
        </div>
    </article>

}

export default PostCard;
