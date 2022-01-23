import { Link, LinkProps } from "@chakra-ui/react";
import NLink from "next/link";
export interface NextLinkProps {}

export const NextLink: React.FC<NextLinkProps & LinkProps> = ({
    children,
    ...props
}) => {
    return (
        <NLink href={props.href} passHref>
            <Link {...props}>{children}</Link>
        </NLink>
    );
};
