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

The broiler plate is primaryly in:

- `src/app.js`
- `src/index.js`
- `src/modules.js` (chunking modules is probably total overkill for this project, but this was in my prior broiler plate, so I just left it)
- `src/reducer.js`
- `src/common`


## APP STRUCTURE
The Architexture was guided by the principles of [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) and [Worse is Better](https://en.wikipedia.org/wiki/Worse_is_better)

### In Redux/React terms, this means:

- each module has one reducer
- each module has one container with connect()
- anything under the container is a “dumb” component
- modules are encapsulated (though some actions are inevitably public for cross component communication):
 	
     *  *for example `BooksContainer` can call `FavoritesActions.Add()` on the `Favorites Module`, however the `Favorites Module` manages and updates it's own reducer*
- since the modules are self contained they all get chunked to their own files; this is a good pattern for very large products as you only send down the wire what is nessacary

## NAMING CONVENTION

Many projects name every file `reducer.js`, `container.js`, `index.js`, etc.

For dev friendliness I errored on the side of caution and chose a naming structure like `favoriteBooks/_favoriteBooksContainer.js` 

* (the underscore here denotes that the particular file is to do with redux state – most projects have a lot more dumb components)

Though the names end up much longer.

This generally makes navigation of bigger projects easier when you browsing a repo online, or if you use a menu prompt to open files in your editor.


## OTHER LIBRARIES

When you `yarn install` you may realize you have to download the entire Universe.

I relied heavily on other modules so that I could be productive and produce something that is hopefully bug free in a short amount of time. 

- Semantic React UI (HTML/CSS)
- Axios for requests
- Redux Thunk for actions
- query-string, because I am making the whole app linkable/stateful through the URL Hash

## DATA
I decided to use the Google Books API for books data. This would have big implications everywhere, especially since I chose the “linkable URL” option for a feature. 

Basically I came to think of Google Books API as my database; and so there is quite bit of work going on with requests, isLoading states and then sorting and displaying this data.

For example, to make every view linkable / reloadable, I had to do a request on every container mount.

A couple things to note:

- on keypress in the search bar I had to cancel prior requests, or else the UI updates would be very funky and without cancelation there would also be potential race conditions on every keypress/network request
- fav book ids get added into the hash, as well as the other feature information orderBy, view and searchTerm 
- because of this, the books reducer initializes on “window.location.hash”
- I started out with an action to build the URL, but since this was so central to my app, I eventually moved it to `store.subscribe` in src/app, I felt this made more sense since every state change was effect the “window.location.hash” as de factor database.


## POST MORTEM
## Did it go smoothly? 

At the beginning of the project I read the requirements a few times; then went for a walk and thought about what I would do. After the walk I made some rough notes about what I would build.

After that I built it in a pretty methodical manner.

I would have liked to try out Jest more in my testing, however I am not super familiar with this library, so ended up using Enzyme.

Overall I am pleased with how it turned out; I believe the code is clean, readable and well organized.

## Any surprises or lessons learned? 
- [query-string](https://www.npmjs.com/package/query-string) is my new goto for working with URL's

- This is my first time time using [Semantic UI React](https://react.semantic-ui.com/introduction) but found it very easy to use, and I think it is also very "semantic" which makes the code more readable, I now much prefer it over React Bootstrap for prototyping and small projects

## Should we implement a production ready version of what you built, or would you do things differently next time? 

I think the code is strong enough to be used in production, however I’d tweak a few things:

-  I’d get a designer UI/UX pro to review it
- I’d make the loading of the views a little smoother 
- I’d upgrade some of the modules in package.json
- I’m confident in my QA, but I’d get some other people to look at it
- The Google API has a daily limit of 1000 requests
- right now the CSS is loaded in the index file, for a production build with Webpack this would have to be added into the build script


