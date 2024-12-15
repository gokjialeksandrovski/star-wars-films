# Star Wars Films Application

A simple and elegant web application that lists Star Wars films, offering filters, sorting, infinite scrolling, and a language switcher for English and German.

## Features

- **Film List**: Displays a list of Star Wars films with the following details:
  - Episode ID
  - Title
  - Director
  - Release Date (formatted as "Month Day, Year")
  - Producers
- **Filters**:
  - Filter by Director (letters only).
  - Filter by Release Year (numbers only).
- **Sorting**:
  - Sort films by Title.
  - Sort films by Release Date.
- **Infinite Scrolling**: Dynamically loads more films as the user scrolls.
- **Language Switcher**:
  - Allows users to toggle between English and German by clicking language buttons in the footer.
  - Page field names, placeholders, and text update dynamically based on the selected language.
- **Error Handling**: Gracefully handles loading and error states with appropriate messages.
- **Responsive Design**: Styled with CSS for readability and compatibility across devices.

## API Information

The application was originally designed to use the **GraphQL API** from `https://swapi-graphql.netlify.app/.netlify/functions/index` with Apollo Client. However, due to the API being down during development, the code was adapted to use the REST API from `https://swapi.tech`.

### GraphQL Support

The project includes commented-out code to fetch data using Apollo Client when the GraphQL API becomes available again. Simply uncomment the relevant sections and replace the REST API integration with the GraphQL queries.

### Explore the Project Online

Check out the "Star Wars Films" project directly without any installation: 'https://star-wars-films-pearl.vercel.app/'.

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/gokjialeksandrovski/star-wars-films.git
   cd https://github.com/gokjialeksandrovski/star-wars-films.git
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Run the following command:

   ```bash
   npm install
   ```

3. **Build the Application**:
   To build the application for production, run:

   ```bash
   npm run build
   ```

4. **Start the Development Server**:
   To start the application, run:

   ```bash
   npm run dev
   ```

5. **OR Start the Production Server**:
   To start the application in production mode, run:

   ```bash
   npm run start
   ```

6. **Open the Application**:
   Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Usage

- Use the **filters** at the top of the page to narrow down films by Director or Release Year.
- Use the **sorting buttons** to sort by Title or Release Date.
- Scroll down to load more films dynamically with **infinite scrolling**.
- Use the **language switcher** in the footer to toggle between English and German by clicking the respective buttons.

## Development Details

- **Primary API Used**: `https://swapi.tech`
- **Backup API (GraphQL)**:
  - URL: `https://swapi-graphql.netlify.app/.netlify/functions/index`
  - Apollo Client setup is included but commented out. When the GraphQL API is online, uncomment the code to use it.

### Technology Stack

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: Custom CSS
- **Language Support**: Built-in language switcher using a translation context.
- **Data Fetching**: `fetch` API with REST (`swapi.tech`).

## Bonus Features

- **Infinite Scrolling**: Seamlessly loads more data as the user scrolls.
- **Language Buttons**: Users can easily switch between English and German using buttons in the footer, with all field names and placeholders updating dynamically.
- **Fully Responsive Design**: Optimized for mobile and desktop views.

## Future Enhancements

- Replace the current REST API (`swapi.tech`) with the original GraphQL API once it’s back online.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

Made by **Gordan Aleksandrovski**.

## Notes

If the GraphQL API becomes available again:

1. Uncomment the Apollo Client code in `Home.tsx`, `ClientLayout.tsx`, and `apollo-client.ts`.
2. Replace the REST API calls with the GraphQL query to fetch films.
3. Ensure Apollo Client is properly configured with your API endpoint.

Enjoy exploring the galaxy of Star Wars films!
