## Extract Method

Add the below method to the cinema class:

```javascript
getFilmByName(name) {
  for (let i=0;i<this.films.length;i++) {
    if (this.films[i].name==movie) {
      return this.films[i]
    }
  }
  
  return null
}
```

Wherever the code looks up a film by name, replace it with a call to this function. Add a similar method for finding for a screen by name.