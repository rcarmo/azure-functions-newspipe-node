# static_server

This function demonstrates how to use Azure Functions Proxies to provide a simple static file server able to serve image assets or client-side code for building a single-page app.

Noteworthy aspects:

* The `proxies.json` file has a catch-all matching rule that rewrites and forwards file requests to this endpoint
  * Proxies are enabled by setting `ROUTING_EXTENSION_VERSION` to `latest` in `proxies.json`
* The output binding `dataType` must be `binary` (`stream`, alas, is not yet supported, so this takes up as much RAM as your largest file)
* You need to output a `buffer` (which is what `readFileSync` currently returns)