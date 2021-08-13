import Link from "next/link";

type CustomLink = {
    href: string;
};

export const CustomLink: React.FC<CustomLink> = ({ href, ...otherProps }) => {
    return (
        <Link href={href}>
            <a {...otherProps} />
        </Link>
    );
};
