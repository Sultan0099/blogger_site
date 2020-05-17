import React, { useEffect, useState } from 'react'

import axios from "axios";

import SimpleNavbar from "../components/SimpleNavbar";

export default function SinglePost(props) {

    const [content, setContent] = useState(null);
    const postId = props.match.params.postId.split(":")[1];
    console.log(postId)

    useEffect(() => {
        async function fetchSinglePost() {
            try {
                console.log("called")
                const res = await axios.post(`/api/post/singlePost/`, { postId },
                    {
                        headers: {
                            "content-type": "application/json",
                            "authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })

                if (res) {
                    setContent(res.data.data)
                    console.log(res
                    )
                }
            } catch (err) {
                console.log({ err })
            }

        }

        fetchSinglePost();
    }, [])


    return (
        <>
            <SimpleNavbar path="/" />
            <div style={{ width: "70%", margin: "0px auto", marginTop: 100 }}>
                {content ? <div dangerouslySetInnerHTML={{ __html: content.body }} ></div> : <p>Loading ... </p>}
            </div>
        </>
    )
}
