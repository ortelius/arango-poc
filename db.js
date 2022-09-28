const { Database, aql } = require('arangojs')

const createDatabase = async (
	url = 'http://127.0.0.1:8529',
	databaseName = 'ortelius'
) => {
	try {
		const db = new Database({ url })

		const databases = await db.listDatabases()

		if (!databases.includes(databaseName)) {
			await db.createDatabase(databaseName)
		}

		db.database(databaseName)

		return db
	} catch (error) {
		console.error(
			`error occurred whilst creating a new database. error: ${error.stack}`
		)
	}
}

const createCollection = async (db, collectionName) => {
	let collection = db.collection(collectionName)

	if (collection) {
		return collection
	}
	return db.createCollection(collectionName)
}

const persistData = async (db, collectionName, data) => {
	try {
		const collection = await db.collection(collectionName)
		const savedData = await collection.save(data)

		db.close()

		return savedData
	} catch (error) {
		console.error(
			`an error occurred whilst persisting data. error: ${error.stack}`
		)
	}

	db.close()

	return null
}

const retrieveData = async (db, collectionName, id) => {
	try {
		const collection = await db.collection(collectionName)
		const retrievedData = await collection.document(id)

		db.close()

		return retrievedData
	} catch (error) {
		console.error(
			`an error occurred whilst retrieving data. error: ${error.stack}`
		)
	}

	db.close()

	return null
}

module.exports = {
	createDatabase,
	createCollection,
	persistData,
	retrieveData
}
