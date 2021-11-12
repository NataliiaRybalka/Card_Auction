import { CREATE_AUCTION_SUCCESS } from "../types/auctions.types";

const initialState = {
  auction: {}
};

export const auctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_AUCTION_SUCCESS:
      return {...state, auction: action.payload};

    default: 
      return state;
  }
};