import { Injectable } from '@nestjs/common';
import { firestore } from '../db';

@Injectable()
export class DbService {
  async getUserByUsername(username: string): Promise<any> {
    try {
      // Get a reference to the users collection
      const usersCollection = firestore.collection('users');

      // Query for the user document with the provided username
      const querySnapshot = await usersCollection.where('username', '==', username).get();

      // If a matching document is found, return its data
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return userData;
      }

      console.error('User not found');
      return null; // User not found
    } catch (error) {
      console.error('Error retrieving user by username:', error);
      throw new Error('Failed to retrieve user');
    }
  }

  async addUser(username: string, password: string): Promise<string> {
    try {
      // Get a reference to the users collection
      const usersCollection = firestore.collection('users');

      // Create a new document with an auto-generated ID
      const newUserRef = usersCollection.doc();

      // Define the data for the new user document
      const userData = {
        username: username,
        password: password,
      };

      // Set the data for the new user document
      await newUserRef.set(userData);

      console.log('User added successfully:', newUserRef.id);
      return newUserRef.id; // Return the ID of the newly created user document
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Failed to add user');
    }
  }
}







