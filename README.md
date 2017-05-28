# azure-functions-newspipe-node

This is a public snapshot of a private project where I demonstrate a few interesting ways to develop [Azure Functions][azf] in [NodeJS][n] for training purposes:

## To Do

- [ ] Integration with cognitive services (see `cognitive_worker`)
- [ ] Database access (see `database_worker`)
- [ ] Queue-driven scaling (see `fetcher_worker`)
- [x] Static file server (see `static_server`)

## Data Flow

    OPML -> fetcher_timer -> fetcher_worker -> cognitive_worker -> database_worker 

[n]: http://nodejs.org
[azf]: https://docs.microsoft.com/en-us/azure/azure-functions/

