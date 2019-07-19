const mongoose = require('mongoose');

// Connect to mongo database
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected To MongoDB'))
  .catch(err => console.error('Counld not connect to MongoDB', err));

//    Create a new schema with mongoose inbuilt method that defines how the
//    data you want to store is going to look like.
//    Note: You can create many schemas (i think) for different data types
//    The seperation comes when creating your model
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

//  Create a model, that we are going to be using to creating the actual
//  data in our database. Think of it like a class
//  First argument is the name of the collection (kinda database) that we want
//  to save whatever we are creating to.
//  The second argument is the schema we want to use for that collection
const Course = mongoose.model('Courses', courseSchema);

async function createCourse() {
  //  Create anew course by instatiating the Course Class
  const firstCourse = new Course({
    name: 'React Js',
    author: 'AdedayoJs',
    tags: ['React', 'Express', 'Front End'],
    isPublished: true
  });

  //  Save the course into the database
  const result = await firstCourse.save();

  console.log(result);
}
async function getCourses() {
  //  You can use regular expression with the filters you apply on the find method
  //  e.g Course.find({author:/pattern/})

  const result = await Course.find({ isPublished: true })
    .limit(10)
    .sort({ name: -1 })
    // .select({ name: 1, tags: 1 });
    .catch(err => console.log('Error Occured', err));
  console.log(result);
}
async function updateCourse(id) {
  // Approach First Method
  //  findById()
  //  Modify
  //  save()

  //    Find Course By Id
  const course = await Course.findById(id);
  if (!course) return;

  //    Modify Returned Course
  course.isPublished = true;
  course.author = 'RobertsJs';

  // or Modify with inbuilt function
  course.set({
    isPublished: true,
    author: 'RobertsJs'
  });

  //    Save Modified Course

  const result = await course.save();
}
async function updateCourse2(id) {
  // Update First Method
  // Update directly
  // Get the updated document

  //  This updates all course that matches our query filter object in this case,
  //  Course that have (_id set to id and author set to 'ade')
  const result = await Course.update(
    {
      _id: id,
      author: 'ade'
    },
    //    Second Argument uses any of mongodb update operations to update data
    {
      $set: {
        author: 'Some Author'
      }
    }
  );

  //    If you want to receive the updated document, use the
  //    Course.findByIdAndUpdate() method. This will return the document in it
  //    original state. If you want the updated doc, you will need a
  //    third argument, {new:true}
}
async function removeCourse(id) {
  // This method finds the first document that matches our query filter object
  //  and deletes it
  const deleteOne = await Course.deleteOne({ _id: id });

  //  To delete many document use deleteMany()
  //  To get the deleted document use findByIdAndRemove()
}

// getCourses();
// updateCourse('5d2fd1e7f79b330949f0e0d1');
