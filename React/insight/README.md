# Insight News App

Insight is a user-friendly news application that allows users to explore news articles from various categories including Business, Sports, Science, and Technology. Users can bookmark their favorite articles for offline reading, providing a seamless news experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Data Storage](#data-storage)
- [License](#license)

## Features

### News Management

- Category Selection: Easily switch between different news categories.
- Bookmarks: Save articles to read later, even when offline.
- Responsive Design: Built with Bootstrap for a clean and responsive UI.
- Social Sharing: Share articles on Facebook, Twitter and other platforms.

## Technologies Used

- **Frontend**: React, TypeScript, Bootstrap
- **HTTP Client**: Axios for API requests
- **News API**: News API to get articles

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/altechemist/CodeTribe.git
   cd insight
   ```

2. **Install dependencies (if applicable)**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to http://localhost:5173/ (or the specified port)

## Usage

**Once the application is running, users can**:

- Upon launching the app, you will see a navigation bar with options for different news categories.
- Click on a category to view articles related to that topic.
- Use the "Bookmarks" link to view articles you have saved for offline reading.

## Components

- NewsFeed: Displays articles based on the selected category.
- Bookmarks: Displays saved articles for offline access.

## State Management

**The app uses React's useState hook to manage the following states**:

- newsCategory: Tracks the selected news category.
- offline: Determines whether to display bookmarks or the news feed.

## Data Storage

The application utilizes the browser's local storage to manage news articles. Each article is stored as an object in local storage, allowing for easy retrieval and manipulation. When the application is launched, it fetches the existing articles from local storage, ensuring users have seamless access to their news content, even when offline.

## License

This project is licensed under the MIT License.
