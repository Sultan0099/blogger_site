import * as actions from "../actions/post";

const initialState = {
  posts: [],
  postsCount: 0,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_POST:
      console.log(actions.CREATE_POST, action.payload)
      return {
        ...state,
        posts: [...state.posts, action.payload],
        postsCount: state.posts.length + 1
      }
    case actions.GET_POSTS:
      return {
        ...state,
        posts: [...action.payload],
        postsCount: action.payload.length,
      }
    default:
      return state;
  }
};

export default postReducer;
