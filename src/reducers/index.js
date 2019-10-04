import {combineReducers} from 'redux'
import {stitchClient} from '../pages/const'
import {RemoteMongoClient} from 'mongodb-stitch-browser-sdk';
import { async } from 'q';


const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db=mongodb.db('EventDash');
const collection= db.collection('Utilisateur');


const AllUsersReducer=()=>{
    const rows =
collection.find().toArray()
        .then(items => {
        return items;
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))

    return (rows)
};

export default combineReducers({
    AllUsers:AllUsersReducer,
});