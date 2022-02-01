const MAX_CAPACITY = 100

class Screen {
constructor(name, capacity) {
    this.name = name
    this.capacity = capacity
}

    invalidCapacity() {
        return this.capacity > MAX_CAPACITY
    }
}
module.exports = Screen