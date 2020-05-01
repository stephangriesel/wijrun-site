import React from "react";
import Layout from '../components/layout';
import PostList from '../components/PostList';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from '../components/seo';

const getPosts = graphql`
{
    allMdx(sort:{
      fields:frontmatter___date,
      order:DESC
    }) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString:"D MMMM 'YY" )
            author
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`

export default () => {

  const response = useStaticQuery(getPosts);
  // console.log(response);
  const posts = response.allMdx.edges
  return (
    <Layout>
      <SEO title={"Home"} />
      <PostList posts={posts} />
    </Layout>
  )
}