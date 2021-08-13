import fs from "fs";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import { CustomLink } from "../components/CustomLink";
import { Test } from "../components/Test";
import { contentFilePaths, CONTENT_PATH } from "../utils/mdxUtils";

const components = {
    a: CustomLink,
    Head,
    Test,
};

type PageProps = {
    source: MDXRemoteSerializeResult<Record<string, unknown>>;
    frontMatter: Record<string, string>;
};

const Page: NextPage<PageProps> = ({ frontMatter, source }) => {
    return (
        <>
            <Head>
                <title>{frontMatter?.title}</title>
                <meta name="description" content={frontMatter?.description} />
            </Head>
            <MDXRemote {...source} components={components} />
        </>
    );
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
    const postFilePath = path.join(CONTENT_PATH, `${params?.slug}.mdx`);

    // if (!fs.existsSync(postFilePath)) {
    //     return { notFound: true };
    // }

    const source = fs.readFileSync(postFilePath);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    });

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = contentFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ""))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug: [slug] } }));

    console.log(paths);

    return {
        paths,
        // any paths not returned by getStaticPaths will result in a 404 page
        // https://nextjs.org/docs/basic-features/data-fetching#fallback-false
        fallback: false,
    };
};

export default Page;
