# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variable for Next.js
ENV NODE_ENV production

# Expose port 3000 for the application
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
