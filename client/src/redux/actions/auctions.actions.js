import { CREATE_AUCTION, REQUEST_AUCTION } from "../types/auctions.types";

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