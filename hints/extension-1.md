# Introduce Explaining Variable
Look at the `if` statement that checks if a showing time overlaps with an existing time. What do each of the `if` conditions check? Could these conditions be checked individually with the result stored in a boolean variable>

# Extract Method
There are several opportunities to extract a method and replace repeated code. You could consider adding methods for the following:
* Finding a film by name
* Finding a screen by name

The code that checks if a showing overlaps with an existing showing could also be moved to it's own method that returns a `true` or `false` value.

The code that parses a time/duration value in to minutes and seconds could also be refactored in to it's own method. This one is a bit trickier, as it will probably need to return an object with 2 keys, hours and minutes and the rest of the code updated to use that object. You will able to improve this even further with an extract class refactoring in the next step. Alternatively, you could also just create a method to validate the format of the value for now, and return the `result` array - this would be a simpler, smaller change.