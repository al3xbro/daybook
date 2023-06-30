import React from 'react'

type Props = {
    date: Date
}

export default function Day({ date }: Props) {
    return (
        <div>{date.getDate()}</div>
    )
}