FROM node:20-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install all dependencies (dev for dev mode)
ARG NODE_ENV=development
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --production; fi

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Default environment
ENV NODE_ENV=development

# Run command based on NODE_ENV
CMD if [ "$NODE_ENV" = "development" ]; then \
        npm run dev; \
    else \
        npm run build && npm run start; \
    fi
