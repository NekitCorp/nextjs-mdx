import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import { CustomLink } from "../components";
import { getContentSlugs, getFileContent } from "../utils/mdxUtils";

const DynamicSliderWithNoSSR = dynamic(() => import("../components/Slider"), {
    ssr: false,
});

const components = {
    a: CustomLink,
    Head,
    Slider: DynamicSliderWithNoSSR,
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

export const getStaticProps: GetStaticProps<PageProps, { slug: string[] }> = async ({ params }) => {
    const source = getFileContent(params?.slug);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content, { scope: data });

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await getContentSlugs()).map((slug) => ({ params: { slug } }));

    return {
        paths,
        // any paths not returned by getStaticPaths will result in a 404 page
        // https://nextjs.org/docs/basic-features/data-fetching#fallback-false
        fallback: false,
    };
};

export default Page;
