# Hololution - a holochain based web server

Every file served by this server is distributed in a holochain network.

Note: this is a proof-of-concept. It needs a lot of work.
Leave an issue and join the [hololution telegram group](https://t.me/hololution).

## Demo

Find an online demo at [hololution.nmr.io](http://hololution.nmr.io)

## Structure

- `server`: a holochain app that stores static resources
- `proxy`: an express app that
  - exposes a `/deploy` route to post new resources to the holochain app
  - proxies all other routes to the holochain app
- `site`: an example site that can be deployed to the proxy

## Start in Docker

Required: node, docker docker-compose.

### 1. Bootstrap

```
npm run bootstrap
```

- Installs needed packages.
- Creates `.env` files

### 2. Edit .env files

Probably won't be necessary the first time you play around with this.

Relevant `.env` files:

- `.env`
- `proxy/.env.docker`
- `site/.env`

### 3. Start

```
npm start
```

Will

- build docker containers (will take a long time, go for coffee!)
- start docker containers

### 4. Deploy Sample Site

```
npm run deploy-site
```

Available pages: `http://localhost:8011` and `http://localhost:8011/page.html`

Try to change files in `site/files` and run `npm deploy`.

## Develop (no docker)

Required: node, holochain

### 1. Bootstrap

```
npm run bootstrap
```

- Installs needed packages.
- Creates `.env` files

### 2. Adapt `.env` files

Probably won't be necessary at the beginning.

Relevant `.env` files:

- `proxy/.env`
- `site/.env`

### 3. Start Development

```
npm run dev
```

- Runs holochain test
- Runs proxy

### 4. Deploy Site

```
npm run deploy-site
```

Available pages: `http://localhost:8011` and `http://localhost:8011/page.html`

Try to change files in `site/files` and run `npm deploy`.
