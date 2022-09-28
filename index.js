const {
	createCollection,
	createDatabase,
	persistData,
	retrieveData
} = require('./db')

const run = async () => {
	try {
		db = await createDatabase()

		const usersCollectionName = 'users'
		await createCollection(db, usersCollectionName)

		const data = {
			firstName: 'Abraham',
			lastName: 'Ortelius'
		}

		const persistDataResponse = await persistData(db, usersCollectionName, data)

		const retrieveDataResponse = await retrieveData(
			db,
			usersCollectionName,
			persistDataResponse._id
		)

		console.log('retrieveDataResponse: ', retrieveDataResponse)
	} catch (error) {
		console.log(`an error occurred in run. error: ${error}`)
	}
}

run()
