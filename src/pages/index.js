import React from "react";
import Layout from '../components/layout';
import { Link } from 'gatsby';

export default () =>
    <Layout>
        <div>
            <Link to='/post/'>Post</Link>
        </div>
    </Layout>