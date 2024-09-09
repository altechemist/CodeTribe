#!/bin/bash

# Check if the project name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <project-name>"
  exit 1
fi

# Store the project name from the first argument
PROJECT_NAME=$1

# Create the Vite project with React and TypeScript template
npm create vite@latest "$PROJECT_NAME" -- --template react-ts

# Navigate into the project directory
cd "$PROJECT_NAME" || { echo "Directory '$PROJECT_NAME' not found"; exit 1; }

# Install dependencies for the Vite project
npm install

# Install Bootstrap and Bootstrap Icons
npm install bootstrap bootstrap-icons

# Add Bootstrap CSS import to the main entry file (index.tsx or index.ts)
if [ -f src/main.tsx ]; then
  MAIN_FILE="src/main.tsx"
elif [ -f src/main.ts ]; then
  MAIN_FILE="src/main.ts"
else
  echo "Main entry file not found. Please add Bootstrap import manually."
  exit 1
fi

# Add import statements for Bootstrap CSS and Bootstrap Icons to the main entry file
echo "import 'bootstrap/dist/css/bootstrap.min.css';" >> "$MAIN_FILE"
echo "import 'bootstrap-icons/font/bootstrap-icons.css';" >> "$MAIN_FILE"

# Inform the user of the successful setup
echo "Vite project created successfully in directory '$PROJECT_NAME'."
echo "Bootstrap and Bootstrap Icons have been installed and imported into '$MAIN_FILE'."
