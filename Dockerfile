FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Run the dev server and expose it to the host
CMD ["npm", "run", "dev", "--", "--host"]
