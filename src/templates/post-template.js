import React from 'react';
import styles from '../css/posttemplate.module.css';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
// import SEO from '../components/seo';
// import { Helmet } from 'react-helmet'


const PostTemplate = ({ data }) => {
  // <SEO title={title} />
  // console.log('<<< PAGE CONTEXT >>>')
  // console.log(pageContext);
  const { title, date, author, image } = data.mdx.frontmatter;
  const { body } = data.mdx;
  const img = image.childImageSharp.fluid;

  return (
    <Layout>
      <section className={styles.template}>
        <Link to='/' className={styles.link}>Back</Link>
        <div className={styles.info}>
          <h1>{title}</h1>
          <h4>
            <span>by {author}</span> / <span>{date}</span>
          </h4>
        </div>
        <Image className={styles.img} fluid={img} />
        <div class={styles.content}>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
query getPost($slug:String!){
    mdx (frontmatter:{slug:{eq:$slug}}){
      frontmatter {
        title
        slug
        date(formatString:"D MMMM 'YY")
        author
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      body
    }
  }
`
export default PostTemplate;
