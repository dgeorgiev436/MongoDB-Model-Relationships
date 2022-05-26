// ONE TO FEW APPROACH

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
	console.log("Database connected");
})

const userSchema = new mongoose.Schema({
	first: String,
	last: String,
	addresses: [
		{
			street: String,
			city: String,
			state: String,
			country: String
			
		}
	]
})

const User = mongoose.model("User", userSchema);

const makeUser = async() => {
	const u = new User({
		first: "Harry",
		last: "Potter"
	})
	u.addresses.push({
		street: "35 Salusbury Road",
		city: "London",
		state: "Barnet",
		country: "UK"
	})
	const res = await u.save()
	console.log(res);
}

const addAdress = async(id) => {
	const user = await User.findById(id);
	user.addresses.push({
		street: "31 Fletcher Court, 1 Joslin Avenue",
		city: "London",
		state: "Colindale",
		country: "UK"
	})
	const newAddress = await user.save();
	console.log(newAddress);
}

// makeUser();
addAdress("60d08c547e42ff060d79dc43");