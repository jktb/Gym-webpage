const express = require('express');
const path = require('path');
const fs = require("fs");
const http = require('http');
const { parse } = require('querystring');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname,'public')))
// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, images)
app.use(express.static('public'))
const server = http.createServer((req, res) => {
  if (req.method === 'post') {
      console.log('Received get request to /subm');
      collectRequestData(req, (data) => {
          console.log('Form data:', data);
          saveFormData(data);
          res.writeHead(302, { 'Location': '/' });
          res.end();
      });
  } else {
      fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
          if (err) {
              res.writeHead(500);
              res.end('Error loading the form');
          } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(content);
          }
      });
  }
});

const saveFormData = (data) => {
  const filePath = path.join(__dirname, 'formData.txt');
  const formattedData = `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}\n\n`;
  
  fs.appendFile(filePath, formattedData, (err) => {
      if (err) {
          console.error('Error saving form data:', err);
      } else {
          console.log('Form data saved successfully.');
      }
  });
};

const collectRequestData = (req, callback) => {
  let body = '';

  req.on('data', (chunk) => {
      body += chunk.toString();
  });

  req.on('end', () => {
      const data = parse(body);
      callback(data);
  });
};

// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
// app.post('/subm', (req, res) => {
//   // console.log('Received POST request to /subm');
//   collectRequestData(req, (data) => {
//     // console.log('Form data:', data);
//       saveFormData(data);
//       res.writeHead(302, { 'Location': '/' });
//       res.end();
//   });
// });



// Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// // Connect to MongoDB
// mongoose.connect('mongodb://', { useNewUrlParser: true, useUnifiedTopology: true });


// // Define a schema for the form submissions
// const submissionSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   message: String,
//   phoneNumber: String,
// });

// // Create a model based on the schema
// const Submission = mongoose.model('Submission', submissionSchema);

// // Endpoint to handle form submissions
// app.post('/submit-form', async (req, res) => {
//   const { name, email, message, phoneNumber } = req.body;

//   // Save the form submission to the database
//   try {
//     await Submission.create({ name, email, message, phoneNumber });
//     console.log('Form submission saved to the database');
//   } catch (error) {
//     console.error('Error saving form submission to the database:', error);
//   }

//   // Send response to the client
//   res.send('Form submitted successfully');
// });



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname,'product.html'))
  })
  
app.get('/service', (req, res) => {
    res.sendFile(path.join(__dirname, 'service.html'))
  })
  
  
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'about.html'))
  })

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,'contact.html'))
  })

app.get('/download', (req, res) => {
    res.download(path.join(__dirname,'public/kitto diet'))
  })
  
 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})