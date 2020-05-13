import React from 'react'

export default function SinglePost(props) {



    return (
        <div>
            single Post page { props.match.params.postId}
        </div>
    )
}
