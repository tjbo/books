# MyFavBooks.com
This is a demo project that uses the Google Books API with React and Redux.

### Installation

#### Step 1:
Download the repo.

#### Step 2:
```yarn install```

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
The Architexture was guided by the principles of Unix Philosophy [Unix Philosophy] (https://en.wikipedia.org/wiki/Unix_philosophy) and [Worse is Better] (https://en.wikipedia.org/wiki/Worse_is_better)

### In Redux/React terms, this means:

- each module has one reducer
- each module has one container with connect()
- anything under the container is a “dumb” component
- modules are encapsulated (though some actions are inevitably public for cross component communication):
 	*for example the books container can call Add on the Favourites Module, but Add will take care of managing it’s own state*
- since the modules are self contained they all get chunked to their own files; this is a good pattern for very large products as you only send down the wire what is nessacary

### NAMING CONVENTION

I’ve seen projects where every file was named reducer.js, container.js, index.js, etc. I’m generally not in love with this naming convention.

I find for dev friendliness that I always error on the side of caution and choose to name things like `favoriteBooks/_favoriteBooksContainer.js` (the underscore here denotes that the particular file is to do with redux state – most projects have a lot more dumb components)

This generally makes navigation of bigger projects easier when you browsing a repo online, or if you use a menu prompt to open files in your editor.


### OTHER LIBRARIES

When you `yarn install` you may realize you have to download the entire Universe.

I relied heavily on other modules so that I could be productive and produce something that is hopefully bug free in a short amount of time. 

- Semantic React UI - for HTML/CSS
- Axios for requests
- Redux Thunk for actions
- query-string, because I am making the whole app linkable/stateful through the URL Hash

DATA
I decided to use the Google Books API for books data. This would have big implications everywhere, especially since I chose the “linkable URL” option for a feature. 

Basically I came to think of Google Books API as my database; and so there is quite bit of work going on with requests, isLoading states and then sorting and displaying this data.

To make every view linkable, I had to do a request on every mount.

A couple things to note:

- on keypress in the search bar I had to cancel prior requests, or else the UI updates would be very funky and without cancelation there would also be potential race conditions on every keypress/network request
- fav book ids get added into the hash, as well as the other feature information orderBy, view and searchTerm 
- because of this, the books reducer initializes on “window.location.hash”
- I started out with an action to build the URL, but since this was so central to my app, I eventually moved it to `store.subscribe` in src/app, I felt this made more sense since every state change was effect the “window.location.hash” as de factor database.

IMPROVEMENTS

- There are some places where I have not been as DRY as I could be. Like for example the AXIOS requests might be better off abstracted away into one “callAPI” function, especially in a bigger codebase
- However since I’m only doing 3 requests, and they all have slightly different requirements for each one. I didn’t mind not keeping this part not DRY. In a larger codebase this would make a lot more sense to have an abstraction layer


IS IT READY FOR PRODUCTION?
This mostly depends on what you mean by Production.

- semantic UI CSS link is index file; in a production build this would probably be compiled from web pack or some other build tool
- more responsive CSS
- some of the packages are outdated, however, I knew when I was using this boilerplate before, that changing different packages, changes the way they are sometimes configured together

*Some of these sections would be in documentation in a normal project. So that I don’t repeat myself I have only included them here.


