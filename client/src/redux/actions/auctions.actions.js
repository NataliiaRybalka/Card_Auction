import { CREATE_AUCTION, REQUEST_AUCTION, REQUEST_FILTER_AUCTION } from "../types/auctions.types";

export const createAuction = auctionData => {
  return {
    type: CREATE_AUCTION,
    payload: auctionData
  }
};

export const getAuctions = () => {
  return {
    type: REQUEST_AUCTION
  }
};

export const getFilterAuctions = filterParams => {
  return {
    type: REQUEST_FILTER_AUCTION,
    payload: filterParams
  }
};