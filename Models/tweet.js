// ONE TO BILLIONS APPROACH

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
	console.log("Database connected");
})

const userSchema = new Schema({
	username: String,
	age: Number
})

const tweetSchema = new Schema({
	text: String,
	likes: Number,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
})

const User = new mongoose.model("User", userSchema);
const Tweet = new mongoose.model("Tweet", tweetSchema);

// const makeTweets = async() => {
// 	// const user = new User({ username: "Spartacus", age: 31})
// 	const user = await User.findOne({username: "Spartacus"});
// 	// const tweet1 = new Tweet({text: "I hate chicken wings", likes: 3});
// 	const tweet2 = new Tweet({text: "I love my coffee break", likes: 2})
// 	tweet2.user = user;
// 	tweet2.save();
// }

// makeTweets();


const findTweets = async() => {
	const allTweets = await Tweet.find({}).populate("user", "username").then(tweet => console.log(tweet));
}

findTweets();