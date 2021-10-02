import Datastore from "lowdb";
import LodashId from "lodash-id";
import FileSync from "lowdb/adapters/FileSync";
import path from "path";
import fs from "fs-extra";
import { remote, app } from 'electron'

const isDevelopment = process.env.NODE_ENV !== "production";

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
    if (!fs.pathExistsSync(STORE_PATH)) {
      fs.mkdirpSync(STORE_PATH)
    }
}

const dbFile = isDevelopment ? "/data-dev.json" : "/data.json"
const adapter = new FileSync(path.join(STORE_PATH, dbFile));

const db = Datastore(adapter);
db._.mixin(LodashId);

db.defaults({
    serverIp: "192.168.31.219",
    serverPort: 5000
}).write();

const DB = {
    has(key) {
    return db
        .read()
        .has(key)
        .value();
    },
    get(key) {
        return db
        .read()
        .get(key)
        .value();
    },
    set(key, value) {
        return db
        .read()
        .set(key, value)
        .write();
    },
    insert(key, value) {
        return db
        .read()
        .get(key)
        .insert(value)
        .write();
    },
    removeById(key, id) {
        return db
        .read()
        .get(key)
        .removeById(id)
        .write();
    },
    groupby(key, prop) {
        const d = db
        .read()
        .get(key)
        .sortBy(prop)
        .reverse()
        .groupBy(prop)
        .value();
        return d;
    },
}


export default DB;