import {combineReducers} from 'redux'
import {stitchClient} from '../pages/const'
import {RemoteMongoClient} from 'mongodb-stitch-browser-sdk';
import {DataBase} from '../pages/const';

const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db=mongodb.db(DataBase);
const collection= db.collection('Utilisateur');

async function fetch(){
        
    return (
        collection.find().toArray()
        .then(items => {
        console.log(`Successfully found ${items.length} documents.`);
        localStorage.setItem('DataTable',JSON.stringify(items));
        return items;
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))
    )
}

async function GetDataFromFetch(){
    return await fetch();
}

const AllUsersReducer = async () => {
    const fetchData = await GetDataFromFetch();
    console.log('My Data', fetchData);
    return Array.prototype.slice.call(fetchData)
};

export default combineReducers({
    AllUsers:AllUsersReducer,
});