export default function appReducer(state, action) {
  switch (action.type) {
    case "UPDATE_MOVIE_LIST":
      return {
        ...state,
        movieList: [...action.payload],
      };

    case "ADD_MOVIE_DETAIL":
      const movieDetail = action.payload;

      return {
        ...state,
        detailList: [...state.detailList, movieDetail],
      };

    default:
      return state;
  }
};