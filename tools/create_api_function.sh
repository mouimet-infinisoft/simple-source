#!/bin/bash

# Navigate to the root directory of the project
cd "$(dirname "$0")/.."

# Prompt the user for the function name
read -p "Enter the name of your new Vercel serverless function (without .js extension): " func_name

# Check if the api directory exists, if not, create it
if [ ! -d "api" ]; then
  mkdir api
fi

# Path to the new function
func_path="api/$func_name.js"

# Check if function already exists
if [ -f "$func_path" ]; then
  echo "Error: A function with the name $func_name already exists!"
  exit 1
fi

# Create the new function with a basic template
cat > "$func_path" <<EOL
module.exports = (req, res) => {
  res.status(200).send('Hello from $func_name!');
};
EOL

echo "Serverless function $func_name.js has been created in the api directory!"
