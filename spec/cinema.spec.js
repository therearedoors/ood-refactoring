const Cinema = require("../src/cinema")

describe("Cinema", () => {
  let cinema

  beforeEach(() => {
    cinema = new Cinema()
  })

  it("creates new screens", () => {
    cinema.save("Screen 1", 20)
    cinema.save("Screen 2", 25)

    const expected = [
      {
        name: "Screen 1",
        capacity: 20,
        showings: []
      },
      {
        name: "Screen 2",
        capacity: 25,
        showings: []
      },
    ]

    expect(cinema.screens).toEqual(expected)
  })

  it("returns error trying to create duplicate screen", () => {
    cinema.save("Screen 1", 20)
    const result = cinema.save("Screen 1", 25)

    const expected = 'Screen already exists'

    expect(result).toEqual(expected)
  })

  it("adds new films", () => {
    cinema.addNew("Nomad Land", "12", "1:48")
    cinema.addNew("The Power of the Dog", "15", "2:08")

    const expected = [
      {
        name: "Nomad Land",
        rating: "12",
        duration: "1:48"
      },
      {
        name: "The Power of the Dog",
        rating: "15",
        duration: "2:08"
      },
    ]

    expect(cinema.films).toEqual(expected)
  })

  it("returns error trying to create duplicate film", () => {
    cinema.addNew("Nomad Land", "12", "1:48")
    const result = cinema.addNew("Nomad Land", "15", "2:08")

    const expected = 'Film already exists'
    
    expect(result).toEqual(expected)
  })

  it("returns error trying to create film with invalid rating", () => {
    const invalidRatings = ["20", "0", "UUU"]
    const validRatings = ["U", "PG", "12", "15", "18"]
    
    for(const invalidRating of invalidRatings) {
      const result = cinema.addNew("Invalid film", invalidRating, "2:08")
      const expected = 'Invalid rating'
      expect(result).toEqual(expected)
    }

    for(const validRating of validRatings) {
      const result = cinema.addNew("Film " + validRating, validRating, "2:08")
      expect(result).toBeUndefined()
    }
  })

  it("returns error trying to create film with invalid durations", () => {
    const invalidDurations = [
      "0:00", 
      "10:00", 
      "abc",
      "4",
      "1:61",
      "1:1"
    ]

    for(const duration of invalidDurations) {
      cinema = new Cinema()
      const result = cinema.addNew("Film", "12", duration)
      const expected = 'Invalid duration'  
      expect(result).withContext(duration).toEqual(expected)
    }
  })

})
