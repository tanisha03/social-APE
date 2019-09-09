import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
} from "../type";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = -1;
      state.screams.forEach(scream => {
        index++;
        if (scream.id === action.payload.screamId) return false;
      });
      state.screams[index].likeCount = action.payload.likeCount;
      if (state.scream.id === action.payload.screamId) {
        state.scream.likeCount = action.payload.likeCount;
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      let index1 = -1;
      state.screams.forEach(scream => {
        index1++;
        if (scream.id === action.payload) return false;
      });
      console.log(index1);
      state.screams.splice(index1, 1);
      return {
        ...state
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case SUBMIT_COMMENT:
      return{
        ...state,
        comments:[action.payload, ...state.scream.comments]
      }
    default:
      return state;
  }
}
