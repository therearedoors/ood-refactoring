const Screen = require("./screen")
const Film = require("./film")
const RATINGS = ["U", "PG", "12", "15", "18"]
const VALID_TIME_FORMAT = /^(\d?\d):(\d\d)$/
const SCREEN_CLEAN_TIME = 20

class Cinema {

  constructor() {
    this.films = []
    this.screens = []
  }

  //Add a new screen
  addScreen(screenName, capacity) {
    const screen = new Screen(screenName,capacity)
    if (screen.invalidCapacity()) {
      return 'Exceeded max capacity'
    }

    //Check the screen doesn't already exist
    const filtered = this.screens.filter(s => s.name === screenName)
    if(filtered.length > 0) {
      return 'Screen already exists'
    }

    this.screens.push({
      name: screenName,
      capacity: capacity,
      showings : []
    })
  }

  //Add a new film
  addFilm(filmName, rating, duration) {

    //Check the film doesn't already exist
    const film = new Film(filmName,rating,duration)
    let filtered = this.films.filter(f => f.name === filmName)
      if (filtered.length > 0) {
      return 'Film already exists'
    }

    //Check the rating is valid
    if (!film.validRating()) {
        return 'Invalid rating'
      }

    //Check duration
    const result = VALID_TIME_FORMAT.exec(duration)
    if(result==null) {
      return 'Invalid duration'
    }

    const hours = parseInt(result[1])
    const mins = parseInt(result[2])
    if(hours<=0 || mins>60) {
      return 'Invalid duration'
    }

    this.films.push(film)
  }

  //Add a showing for a specific film to a screen at the provided start time
  addShowtime(filmName, screenName, startTime) {

    let result = VALID_TIME_FORMAT.exec(startTime)
    if(result==null) {
      return 'Invalid start time'
    }
    
    const intendedStartTimeHours = parseInt(result[1])
    const intendedStartTimeMinutes = parseInt(result[2])
    if(intendedStartTimeHours<=0 || intendedStartTimeMinutes>60) {
      return 'Invalid start time'
    }


    let film = this.films.find(f => f.name === filmName)
    //Find the film by name

    if(film===undefined) {
      return 'Invalid film'
    }

    //From duration, work out intended end time
    //if end time is over midnight, it's an error
    //Check duration
    result = VALID_TIME_FORMAT.exec(film.duration)
    if(result==null) {
      return 'Invalid duration'
    }

    const durationHours = parseInt(result[1])
    const durationMins = parseInt(result[2])
    
    //Add the running time to the duration
    let intendedEndTimeHours = intendedStartTimeHours + durationHours
    
    //It takes 20 minutes to clean the screen so add on 20 minutes to the duration 
    //when working out the end time
    let intendedEndTimeMinutes = intendedStartTimeMinutes + durationMins + SCREEN_CLEAN_TIME
    if (intendedEndTimeMinutes>=60) {
      intendedEndTimeHours += Math.floor(intendedEndTimeMinutes/60)
      intendedEndTimeMinutes = intendedEndTimeMinutes%60
    }

    if(intendedEndTimeHours>=24) {
      return 'Invalid start time - film ends after midnight'
    }

    //Find the screen by name
    let theatre = null
    for (let i=0;i<this.screens.length;i++) {
      if (this.screens[i].name==screenName) {
        theatre = this.screens[i]
      }
    }

    if(theatre===null) {
      return 'Invalid screen'
    }
    
    //Go through all existing showings for this film and make
    //sure the start time does not overlap 
    let error = false
    for(let i=0;i<theatre.showings.length;i++) {

      //Get the start time in hours and minutes
      const startTime = theatre.showings[i].startTime
      result = VALID_TIME_FORMAT.exec(startTime)
      if(result==null) {
        return 'Invalid start time'
      }
  
      const startTimeHours = parseInt(result[1])
      const startTimeMins = parseInt(result[2])
      if(startTimeHours<=0 || startTimeMins>60) {
        return 'Invalid start time'
      }

      //Get the end time in hours and minutes
      const endTime = theatre.showings[i].endTime
      result = VALID_TIME_FORMAT.exec(endTime)
      if(result==null) {
        return 'Invalid end time'
      }
  
      const endTimeHours = parseInt(result[1])
      const endTimeMins = parseInt(result[2])
      if(endTimeHours<=0 || endTimeMins>60) {
        return 'Invalid end time'
      }

      //if intended start time is between start and end
      const d1 = new Date()
      d1.setMilliseconds(0)
      d1.setSeconds(0)
      d1.setMinutes(intendedStartTimeMinutes)
      d1.setHours(intendedStartTimeHours)

      const d2 = new Date()
      d2.setMilliseconds(0)
      d2.setSeconds(0)
      d2.setMinutes(intendedEndTimeMinutes)
      d2.setHours(intendedEndTimeHours)

      const d3 = new Date()
      d3.setMilliseconds(0)
      d3.setSeconds(0)
      d3.setMinutes(startTimeMins)
      d3.setHours(startTimeHours)

      const d4 = new Date()
      d4.setMilliseconds(0)
      d4.setSeconds(0)
      d4.setMinutes(endTimeMins)
      d4.setHours(endTimeHours)

      if ((d1 > d3 && d1 < d4) || (d2 > d3 && d2 < d4) || (d1 < d3 && d2 > d4) ) {
        error = true
        break
      }
    }

    if(error) {
      return 'Time unavailable'
    }

    //Add the new start time and end time to the showing
    theatre.showings.push({
      film: film,
      startTime: startTime,
      endTime: intendedEndTimeHours + ":" + intendedEndTimeMinutes
    })
  } 

  allShowings() {
    let showings = {}
    for (let i=0;i<this.screens.length;i++) {
      const screen = this.screens[i]
      for(let j=0;j<screen.showings.length;j++) {
        const showing = screen.showings[j]
        if (!showings[showing.film.name]) {
          showings[showing.film.name] = []
        }
        showings[showing.film.name].push( `${screen.name} ${showing.film.name} (${showing.film.rating}) ${showing.startTime} - ${showing.endTime}`)
      }
    }
  
    return showings
  }
}

module.exports = Cinema