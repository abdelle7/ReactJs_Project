import {combineReducers} from 'redux'
import {stitchClient} from '../pages/const'
import {RemoteMongoClient} from 'mongodb-stitch-browser-sdk';

const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db=mongodb.db('EventDash');
const collection= db.collection('Utilisateur');

function fetch(){
        
    collection.find().toArray()
    .then(items => {
    console.log(`Successfully found ${items.length} documents.`);
    localStorage.setItem('DataTable',JSON.stringify(items));
    return items;
    })
    .catch(err => console.error(`Failed to find documents: ${err}`));
}
function TestLocal(){
    if (JSON.parse(localStorage.getItem('DataTable')) === null) {
        const rows1=[];
        return rows1
    }else{
        const rows1=JSON.parse(localStorage.getItem('DataTable'));
        return rows1;
    }
}


const AllUsersReducer=()=>{
    return (TestLocal())
};

export default combineReducers({
    AllUsers:AllUsersReducer,
});