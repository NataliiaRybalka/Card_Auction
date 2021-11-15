import { CREATE_AUCTION_SUCCESS, GET_AUCTION } from "../types/auctions.types";

const initialState = {
  auction: {},
  auctions: [],
  totalItem: null
};

export const auctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_AUCTION_SUCCESS:
      return {...state, auction: action.payload.auctions, totalItem: action.payload.totalItem};
    case GET_AUCTION:
      return {...state, auctions: action.payload};

    default: 
      return state;
  }
};