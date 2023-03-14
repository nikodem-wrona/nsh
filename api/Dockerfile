FROM node:18.12.1 AS builder
# Install all dependencies
WORKDIR /usr/src/app/

COPY package.json .
COPY yarn.lock .

RUN yarn

# Build the app
COPY . .

RUN yarn build

# Create production image
FROM node:18.12.1-alpine

WORKDIR /usr/src/app/

RUN addgroup -S app-runner && \
  adduser -S -G app-runner app-runner && \
  chown app-runner:app-runner .

USER app-runner

# Install production dependencies
COPY --chown=app-runner:app-runner --from=builder /usr/src/app/package.json .
COPY --chown=app-runner:app-runner --from=builder /usr/src/app/yarn.lock .

RUN yarn --production

# Copy app files
COPY --chown=app-runner:app-runner --from=builder /usr/src/app/dist/ ./dist/

CMD ["yarn", "run", "start:prod"]
