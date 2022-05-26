// ONE TO MANY APPROACH

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
	console.log("Database connected");
})

const productSchema = new Schema({
	name: String,
	price: Number,
	season: {
		type: String,
		enum: ["Spring", "Summer", "Fall", "Winter"]
	}
})
const farmSchema = new Schema({
	name: String,
	city: String,
	products:[{
		type: Schema.Types.ObjectId,
		ref: "Product"
	}]
})

const Product = new mongoose.model("Product", productSchema);
const Farm = new mongoose.model("Farm", farmSchema);

// Product.insertMany([
// 	{name: "Godess Mellon", price: 4.99, season: "Summer"},
// 	{name: "Sugar Baby Watermellon", price: 5.99, season: "Summer"},
// 	{name: "Asperagus", price: 3.99, season: "Spring"}
// ])

// const makeFarm = async() => {
// 	const farm = new Farm({name: "Full Belly Farms", city: "London"})
// 	const melon = await Product.findOne({name: "Godess Mellon"})
// 	farm.products.push(melon);
// 	await farm.save();
// 	console.log(farm);
// }

// makeFarm();

const addProduct = async() => {
	const farm = await Farm.findOne({name: "Full Belly Farms"});
	const watermellon = await Product.findOne({name: "Sugar Baby Watermellon"})
	farm.products.push(watermellon);
	await farm.save();
	console.log(farm);
}

// addProduct();

Farm.findOne({name: "Full Belly Farms"}).populate("products").then(farm => console.log(farm));
