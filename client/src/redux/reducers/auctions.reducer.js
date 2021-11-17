import { CREATE_AUCTION_SUCCESS, GET_AUCTION, GET_TOTAL_AUCTION } from "../types/auctions.types";

const initialState = {
  auction: {},
  auctions: [],
  totalItem: null,
  totalAuctions: [],
  auctionsWithoutPagination: []
};

export const auctionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_AUCTION_SUCCESS:
      return {...state, auction: action.payload};

    case GET_AUCTION:
      return {
        ...state,
        auctions: action.payload.auctions,
        totalItem: action.payload.totalItem,
        auctionsWithoutPagination: action.payload.auctionsWithoutPagination
      };
      
    case GET_TOTAL_AUCTION:
      return {...state, totalAuctions: action.payload};

    default: 
      return state;
  }
};