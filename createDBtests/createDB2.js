const mongoose = require('mongoose');

//const mongoURL = 'mongodb+srv://dbAdmin:dbAdmin@cluster0.e1tui.mongodb.net/dbChat?retryWrites=true&w=majority';
const mongoURL = 'mongodb://127.0.0.1/chat';

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected.");
});

//const Cat = mongoose.model('Cat', { name: String });
const kittySchema = new mongoose.Schema({
    name: String
  });

kittySchema.methods.speak = function () {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'



//const kitty = new Cat({ name: 'Zildjian' });
//kitty.save().then(() => console.log('meow'));

silence.save().then(()=>{
  console.log('Saved');
  db.close();
});