import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000';

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all snacks.
  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {
	static async getSnacks() {
		const result = await axios.get(`${BASE_API_URL}/snacks`);
		return result.data;
	}

	// this will get all drinks
	static async getDrinks() {
		const result = await axios.get(`${BASE_API_URL}/drinks`);
		return result.data;
	}

	// this will add a snack
	static async addSnack(newSnack) {
		const result = await axios.post(`${BASE_API_URL}/snacks`, { ...newSnack });
		return result.data;
	}

	// this will add a drink
	static async addDrink(newDrink) {
		const result = await axios.post(`${BASE_API_URL}/drinks`, { ...newDrink });
		return result.data;
	}
}

export default SnackOrBoozeApi;
