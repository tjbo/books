# Books
This is a demo project that uses the Google Books API with React and Redux.

#### Selected Enhancements

- Sort books by ascending, descending, recently added*. Linkable (i.e. copy/paste browser
url and same view displays).

- Switchable layouts (from grid view to list view). Linkable.

(**instead of recently added, publishedDate was used from the Google Books API*)

### Installation

- Download / Unzip the repo.

- ```yarn install```

### Run Local Dev
```yarn start``` 

### To Run Tests
```yarn run test```


### Test Coverage
```yarn test -- --coverage```

# Project Synopsis & Documentation

## BROILER PLATE
This project uses Create React App with some broiler plate that I’ve used with success on other projects before. 

The broiler plate is primarily in:

- `src/app.js`
- `src/index.js`
- `src/modules.js` 
- `src/reducer.js`
- `src/common`

## APP STRUCTURE
The Architecture was guided by the principles of [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) and [Worse is Better](https://en.wikipedia.org/wiki/Worse_is_better)

### In Redux/React terms, this means:

- each module has one reducer
- each module has one container with connect()
- anything under the container is a “dumb” component
- modules are encapsulated (though some actions are inevitably public for cross component communication):
 	
	 *  *for example `BooksContainer` can call `FavoritesActions.Add()` on the `FavoritesModule`, however the `FavoritesModule` manages and updates it's own reducer*
- since the modules are self contained they all get chunked to their own files; this is a good pattern for very large products as you only send down the wire what is nessacary. The relatively "loose coupling" of modules makes them easy to replace, modify or remove.

## NAMING CONVENTION

Many projects name every file `reducer.js`, `container.js`, `index.js`, etc.

For dev friendliness I chose a more verbose naming structure, for example `favoriteBooks/_favoriteBooksContainer.js` 

* the underscore here denotes that the particular file is to do with Redux State

Though the names end up much longer, this generally makes navigation of bigger projects easier when you are browsing a repo online, or if you use a menu prompt to open files in your editor.

## OTHER LIBRARIES

I relied heavily on other modules so that I could be productive and produce something that is hopefully bug free in a short amount of time. 

- Semantic React UI (HTML/CSS)
- Axios for requests
- Redux Thunk for actions
- query-string, because I am making the whole app linkable/stateful through the URL Hash

## DATA
I decided to use the Google Books API for books data. This would have implications everywhere, especially since I also chose the “linkable URL” option for a feature. 

Basically I came to think of Google Books API as my database; and so there is quite bit of work going on with requests, isLoading states and then sorting and displaying this data.

For example, to make every view linkable / reloadable, I had to do a request on every container mount.

A couple things to note:

- on keypress in the search bar I had to cancel prior requests, or else the UI updates would be very funky and without cancelation there would also be potential race conditions on every keypress/network event
- fav book ids get added into the hash, as well as the other feature information orderBy, view and searchTerm 
- because of this, the books reducer initializes on “window.location.hash”
- I started out with an action to build the URL, but since this was so central to my app, I eventually moved it to `store.subscribe` in src/app, I felt this made more sense since every state change was effect the “window.location.hash” as de factor database.


## POST MORTEM
## Did it go smoothly? 

At the beginning of the project I read the requirements a few times; then went for a walk and thought about what I would build. After the walk I made some rough notes and had a pretty good idea how this project would go.

After that I built the project in a very methodical manner.

I would have liked to try out Jest more in my testing, however I am not super familiar with this library, so ended up using Enzyme.

Overall I am pleased with how it turned out.

## Any surprises or lessons learned? 
- [query-string](https://www.npmjs.com/package/query-string) is my new goto for working with URL's

- This is my first time time using [Semantic UI React](https://react.semantic-ui.com/introduction) but found it very easy to use, and I think it is also very "semantic" which makes the code more readable, I now much prefer it over React Bootstrap for prototyping and small projects

- When testing Axios requests, I ran into a small Axios bug, but was able to get around it by mocking it in Jest

## Should we implement a production ready version of what you built, or would you do things differently next time? 

I think the code is strong enough to be used in production, however I’d tweak a few things:

- a UI/UX pro to review the graphics
- make the loading of the views a little smoother 
- upgrade some of the modules in package.json
- The Google API has a daily limit of 1000 requests
- right now the CSS is loaded in the index file, for a production build with Webpack this would have to be added into the build script


