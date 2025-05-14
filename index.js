const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

// Arrays of objects to simulate a database
// In a real-world application, you would use a database like MongoDB, MySQL, etc.
const Course = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' }
]

// Middleware to parse JSON data
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
  res.send(Course);
});
app.get('/api/courses/:id', (req, res) => {
    const course = Course.find(c => c.id === parseInt(req.params.id));
    //Object Destructuring
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: Course.length + 1,
        name: req.body.name
    };
    Course.push(course);
    res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
      name: Joi.string().min(3).required()
  });
  return schema.validate(course);
}
//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));