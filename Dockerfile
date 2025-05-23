# Use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies into temp directory
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb* /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb* /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp directory and project files
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Build the Remix application
ENV NODE_ENV=production
RUN bun run build

# Copy production dependencies and build artifacts into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/build ./build
COPY --from=prerelease /usr/src/app/public ./public
COPY --from=prerelease /usr/src/app/package.json .

# Run the Remix server
USER bun
EXPOSE 3000/tcp
# For Remix specifically, we need to run the server entry point
CMD ["bun", "run", "start"]