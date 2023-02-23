# angular-zone-custom-fork-parent-lost-in-rxjs-operators
Repository created to reproduce a bug with Angular core and Zone.js in a rxjs context

## Step for bug reproduction
- Run the `npm ci` command to install dependencies
- Run the `ng serve` command to start the project on `http:localhost:4200`
- Open `http:localhost:4200` on a web browser.

### Issue (current behaviour)
Two wrapped functions are called inside the `ngOnInit` method.
- The first one using `rxjs Observable` display in the console: `obs_bar angular`.
- The second one using `Promise` display in the console: `promise_bar promise_foo`.

### Expected behaviour
As the one using `Promise`, the wrapped method using `rxjs Observable` should display in the console: `obs_bar obs_foo`
