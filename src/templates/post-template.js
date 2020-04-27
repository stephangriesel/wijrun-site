import React from 'react';
import styles from '../css/posttemplate.module.css';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';


const PostTemplate = ({ pageContext }) => {
    console.log('<<< PAGE CONTEXT >>>')
    console.log(pageContext);
    return (
        <div>
            post template
        </div>
    )
}

export default PostTemplate;
