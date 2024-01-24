import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import data from '../../public/data/redirect/redirect.json'; // import JSON file
import fetch from 'node-fetch';

type RedirectComponentProps = {
    redirectUrl: string;
    title: string;
    description: string;
    imageUrl: string;
};

const RedirectComponent = ({ redirectUrl, title, description, imageUrl }: RedirectComponentProps) => {
    const router = useRouter()

    useEffect(() => {
        window.location.href = redirectUrl
    }, [redirectUrl])

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
            </Head>
            <div>Loading...</div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const redirectData = Array.isArray(context.query.data) ? context.query.data[0] : context.query.data;
    let redirectUrl = (data as {[key: string]: string})[redirectData as string]; // use data from JSON file

    if (!redirectUrl) {
        redirectUrl = 'https://www.sarveshdakhore.in/projects'
    } else {
        if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
            redirectUrl = 'https://' + redirectUrl; // add https:// to the URL if it doesn't already start with http:// or https://
        }
    }

    // Fetch the link preview data from the LinkPreview API
    const response = await fetch(`https://api.linkpreview.net/?key={your_api_key}&q=${encodeURIComponent(redirectUrl)}`);
    const previewData = await response.json();

    return {
        props: {
            redirectUrl,
            title: (previewData as any).title,
            description: (previewData as any).description,
            imageUrl: (previewData as any).image,
        },
    }
}

export default RedirectComponent;