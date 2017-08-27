import * as firebase from 'firebase';
import config from '../../.env.local.js';

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();