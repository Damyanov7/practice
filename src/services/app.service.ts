import { Injectable } from '@nestjs/common';
import { firestore } from '../db';

// Get a reference to a specific collection
const collectionRef = firestore.collection('users');

@Injectable()
export class AppService {
  // Request triggered when user sells NFT, updates DB to delete data from database related to the NFT
  async nftSell(): Promise<any> { 

  }

  // Request triggered when user buys NFT, updates DB to add data to database related to the NFT
  async nftBuy(): Promise<any> {

  }

  async getUserNfts(): Promise<any> {

  }

  async getUserNft(): Promise<any> {

  }

}
