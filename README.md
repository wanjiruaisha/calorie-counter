# Calorie Counter

## Project Overview

Calorie Counter is a web application that helps users track their daily calorie intake. Users can add food items, view their calorie consumption, remove items, and reset their daily records. The application stores data using localStorage, ensuring information remains available even after refreshing the page.

The project demonstrates the use of JavaScript, DOM Manipulation, Event Handling, Fetch API, and localStorage while providing a responsive and user-friendly interface.

---

## Features

* Add food items to a daily calorie log
* Automatically fetch calorie information using the Open Food Facts API
* Display all food items in a dynamic list
* Calculate and display total calories consumed
* Remove food items individually
* Reset all food records for a new day
* Store data using localStorage for persistence
* Responsive user interface built with Tailwind CSS
* Error handling for failed API requests
* Progress bar showing progress toward a daily calorie goal

---

## Technologies Used

* HTML5
* CSS3
* Tailwind CSS
* JavaScript (ES6+)
* DOM Manipulation
* Fetch API
* localStorage
* Git & GitHub

---

## Project Structure

```text
calorie-counter/
│
├── index.html
├── styles.css
├── script.js
├── README.md
|
```

---

## How It Works

1. The user enters the name of a food item.
2. The application sends a request to the Open Food Facts API.
3. The calorie information is retrieved automatically.
4. The food item is added to the list.
5. Total calories are updated dynamically.
6. Data is saved to localStorage for persistence.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/wanjiruaisha/calorie-counter.git
```

2. Navigate to the project folder:

```bash
cd calorie-counter
```

3. Open the project in Visual Studio Code.

4. Launch the project using Live Server or open `index.html` in a browser.

---

## Usage

### Add Food Item

* Enter a food name.
* Click **Add Food**.
* The application retrieves calorie information and adds it to the list.

### Remove Food Item

* Click the **Remove** button next to any food item.

### Reset Daily Records

* Click the **Reset Day** button to clear all food items and calorie records.

---

## API Integration

This project uses the Open Food Facts API to retrieve food and calorie information.

API Endpoint:

```text
https://world.openfoodfacts.org
```

The API is accessed using JavaScript Fetch API.

---

## Data Persistence

The application uses localStorage to save food items and calorie records.

Stored Data:

```javascript
localStorage.setItem("foods", JSON.stringify(foods));
```

This ensures data remains available after page refreshes.

---

## Future Improvements

* User authentication
* Custom calorie goals
* Food categories
* Search suggestions
* Daily and weekly calorie reports
* Dark mode
* Nutrition breakdown (protein, carbohydrates, fats)
* Charts and analytics dashboard

---

## Contributions

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Commit your changes using meaningful commit messages.
5. Push your branch to GitHub.
6. Submit a Pull Request.

Please ensure your code follows clean coding practices and includes appropriate documentation.

---

## Collaborations

This project was developed as part of a web development learning program and is open to collaboration from fellow developers, students, and mentors.

Areas where collaboration is encouraged include:

* User interface improvements
* Performance optimization
* Additional nutrition tracking features
* API enhancements
* Data visualization and reporting
* Accessibility improvements
* Mobile responsiveness

If you would like to collaborate, feel free to fork the repository and submit a Pull Request.

---

## Author

Developed by Aisha Wanjiru.

---

## License

This project is licensed under the MIT license