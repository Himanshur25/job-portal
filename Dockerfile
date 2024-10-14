# base Image
FROM node:18-alpine

# Setting working directory.
WORKDIR /app

# Copy the host files in 
COPY . .

# Install dependencies
RUN npm install

EXPOSE 3000

# Running the app
CMD [ "npm", "start" ]
