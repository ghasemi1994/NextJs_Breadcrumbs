import { useRouter } from 'next/router';
import { navigations } from '../../../../data/customerNavigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Breadcrumb() {

    type breadType = {
        breadcrumb: string,
        href: string
    }


    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState<breadType[]>([]);

    useEffect(() => {
        if (router) {

            const linkPath = router.asPath.split('/');
            linkPath.shift();
            const pathArray = linkPath.map((path, i) => {
                return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
            });
            setBreadcrumbs(pathArray);
        }

    }, [router]);

    if (!breadcrumbs) {
        return null;
    }

    return (
        <>
            {breadcrumbs.map((item: breadType) => {
                return (

                    <Link href={item.href} key={item.href} className='text-gray-600 hover:text-gray-400 my-6'>
                        {navigations.find(f => f.href === item.href)?.title}
                    </Link>

                );
            })}
        </>
    )
}
