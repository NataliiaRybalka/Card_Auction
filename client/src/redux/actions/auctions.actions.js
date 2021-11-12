import { CREATE_AUCTION } from "../types/auctions.types";

export const createAuction = auctionData => {
  return {
    type: CREATE_AUCTION,
    payload: auctionData
  }
};