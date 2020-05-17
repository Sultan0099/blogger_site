import axios from "axios";

import * as actions from "../actions/post";


const createPost = (postData, props) => {
    return async (dispatch, getState) => {
        try {
            console.log(postData)
            const res = await axios.post("/api/post/create", postData, {
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            console.log(res)
            await dispatch({ type: actions.CREATE_POST, payload: res.data.data })
        } catch (error) {
            console.log(error)
        }
    };
};

const getAllPosts = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get("/api/post/posts", {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            console.log(res)

            await dispatch({ type: actions.GET_POSTS, payload: res.data.data })

        } catch (error) {

        }
    }
}

export { createPost, getAllPosts }