import { stitchClient } from '../pages/const'
import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import { DataBase } from '../pages/const';
import { put } from 'redux-saga/effects';
import { fetch_users } from '../actions'
import { takeEvery } from 'redux-saga/effects'
const mongodb = stitchClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
const db = mongodb.db(DataBase);
const collection = db.collection('Utilisateur');

export function* getUsersSaga() {
        const result = yield collection.find().toArray();
        yield put(fetch_users(result));


}
export function* watchUsers() {
        yield takeEvery('GET_ALL_DATA', getUsersSaga);
}