const RATINGS = ["U", "PG", "12", "15", "18"]

class Film {
    constructor(name,rating,duration){
        this.name = name
        this.rating = rating
        this.duration = duration
    }

    validRating(){
       return RATINGS.includes(this.rating)
    }
}

module.exports = Film