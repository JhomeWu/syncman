# syncman
Project is not completed

## TODO
1. Read env for api key
2. Pull Command
3. Push Command
4. Pull Command with option
5. Push Command with option

## Setup
1. Init the `sync-state.json` for config & log sync state
```
npm run syncman init
```

2. Copy `.env.example` Set your Postman API Key in `.env`
```
cp .env.example .env
```

## First Usage
There are two situation
1. Have local stored collection
2. Need to export from your Postman Workspace
### 1. Have local stored collection
1. Setup `default.path` in `sync-state.json`
2. Push it from local to your Postman Workspace
```
npm run syncman push
```
### Need to download it First
1. Setup `default.id` that on remote && `default.path` where you want to store collection in your local in `sync-state.json`
2. Pull it your Postman Workspace to local
```
npm run syncman pull
```

