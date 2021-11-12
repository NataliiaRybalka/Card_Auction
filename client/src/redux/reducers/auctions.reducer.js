import { CREATE_AUCTION_SUCCESS, GET_AUCTION } from "../types/auctions.types";

const initialState = {
  auction: {},
  auctions: []
};

export const auctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_AUCTION_SUCCESS:
      return {...state, auction: action.payload};
    case GET_AUCTION:
      return {...state, auctions: state.auctions.concat([action.payload])};

    default: 
      return state;
  }
};