import { CREATE_AUCTION, REQUEST_AUCTION, REQUEST_TOTAL_AUCTION, CREATE_BET } from "../types/auctions.types";

export const createAuction = auctionData => {
  return {
    type: CREATE_AUCTION,
    payload: auctionData
  }
};

export const getAuctions = filterData => {
  return {
    type: REQUEST_AUCTION,
    payload: filterData
  }
};

export const getTotalAuctions = () => {
  return {
    type: REQUEST_TOTAL_AUCTION
  }
};

export const createBet = auctionData => {
  return {
    type: CREATE_BET,
    payload: auctionData
  }
};