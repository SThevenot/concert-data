/** @format */

const db = require("../config/connection");
const { User, Concert } = require("../models");

const userData = require("./userData.json");
const concertData = require("./concertData.json");

db.once("open", async () => {
  try {
    await Concert.deleteMany({});
    await User.deleteMany({});
    await User.create(userData);
    for (var i = 0; i < concertData.length; i++) {
      const { _id, concertAuthor } = await Concert.create(concertData[i]);
      const user = await User.findOneAndUpdate(
        { username: concertAuthor },
        {
          $addToSet: {
            concerts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("all done seeding!");
  process.exit(0);
});
