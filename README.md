# Smart Building Research Website

This GitHub project contains the code for a smart building research website. The website consists of a React.js-based frontend and a Flask API-based backend. The backend interacts with a PostgreSQL database that stores data from hundreds of sensors across 50 rooms, recorded every second.

## Website Demo


## Features

- Partitioned database: The data from the sensors is stored in a PostgreSQL table with millions of rows. To improve performance, the data is partitioned into different databases with table names as sensor IDs. Additionally, indices are added for faster data retrieval between two timestamps.

- Flask API: The backend includes Flask APIs that allow fetching data based on various parameters such as features, timestamps, and user ID. The data is cleaned and converted into JSON format before sending it to the frontend.

- React.js-based webpages: The frontend includes several webpages, including a home page, a register page, and a data download page. The register page features an input form where users can provide details such as email and affiliation. The data download page takes registered user details, timestamps (from and to), and features as input. After clicking the download button, a request is sent to the Flask API backend.

- Data processing and download: Upon receiving the request, the Flask API backend processes the data and sends it back to the frontend in JSON format. The frontend then converts the JSON into CSV files and compresses them into a zip file. Each room's data between the given timestamps is included in the zip file.

- Input field validation: The input fields on the register page and data download page are validated to ensure that the provided data is correct and complete.

## Additional Backend Development and Documentation

In addition to the website's core functionality, the backend of the project includes various components and features that have been developed and documented. Some of these include:

- PostgreSQL connection: The backend establishes a connection to the PostgreSQL database to retrieve the sensor data.

- Additional table creation: The backend creates additional tables in the database to facilitate efficient data storage and retrieval.

- Data parsing: The backend includes functionality to parse and process the raw sensor data obtained from the database.

- CSV parsing: The backend can parse CSV files and extract relevant information for further processing.

- Python Flask APIs: The backend implements Python Flask APIs to enable smooth communication between the frontend and backend components of the website.

## Usage

To use this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies for both the frontend (React.js) and backend (Flask).
3. Set up the PostgreSQL database and configure the necessary credentials in the backend code.
4. Run the backend server using the provided command or script.
5. Start the frontend development server using the provided command or script.
6. Access the website through your web browser and navigate through the available pages.
7. Register on the website using the provided form.
8. Provide the required details and select the desired parameters on the data download page.
9. Click the download button and wait for the zip file to be generated and downloaded.
