import { useRouter } from 'next/router'
import { useEffect } from 'react'
import data from '../../public/data/redirect/redirect.json'; // import JSON file

const RedirectComponent = () => {
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;

        const redirectData = Array.isArray(router.query.data) ? router.query.data[0] : router.query.data;
        let redirectUrl = (data as {[key: string]: string})[redirectData as string]; // use data from JSON file

        if (!redirectUrl) {
            redirectUrl = 'https://www.default.com'
        } else {
            if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
                redirectUrl = 'https://' + redirectUrl; // add https:// to the URL if it doesn't already start with http:// or https://
            }
        }

        window.location.href = redirectUrl
    }, [router.isReady, router.query])

    return null
}

export default RedirectComponent;