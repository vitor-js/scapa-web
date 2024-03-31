import Link from 'next/link'
import { cloneElement } from 'react'
import { useColors } from '../../../../hooks'


export function ActiveLink({ children, ...props }) {

    const colors = useColors()
    return (
        <Link {...props}>
            {cloneElement(children, {
                color: colors.text,
                transition: 'color 0.4s',
                textDecoration: 'none',
            })}
        </Link>
    )
}
