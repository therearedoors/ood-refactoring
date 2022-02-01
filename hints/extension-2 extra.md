## Extract Class
An extracted `Time` class could have the following outline

```javascript
class Time {
  constructor(hours, minutes) {
    this.hours = hours
    this.minutes = minutes
  }

  //both timeStart and timeEnd are instances of the time class
  overlaps(timeStart, timeEnd) {
    //Check if this time overlaps with timeStart and timeEnd -
    //can convert to date values just like the existing code doles
  }

  addMinutes(minutes) {
    //Implement logic to add minutes, same as existing code in cinema class
  }

  string() {
    return `${this.hours}:${this.minutes}`
  }
}
```

A new method on the Cinema class could be used to create time class instances from valid time strings:

```javascript
createTime(timeString) {
  result = /^(\d?\d):(\d\d)$/.exec(timeString)
  if(result==null) {
    return null
  }

  const timeHours = parseInt(result[1])
  const timeMins = parseInt(result[2])
  if(timeHours<=0 || timeMins>60) {
    return null
  }

  return new Time(timeHours, timeMinutes)
}
```

As an advanced step, this method could be moved to the Time class and made `static`, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
