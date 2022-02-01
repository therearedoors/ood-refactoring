## Rename Method
Look at each of the methods on the Cinema class - what do each of the methods do? Do their names describe communicate their purpose? Start by giving them better names.

## Rename Variable
Take a look at the method parameters and variable names in the methods. The code deals with films, screens and showings - are the same terms used consistently in the code base? When the code refers to a film name, is it always using `filmName`? What about the `d1`, `d2` etc. variables? Could these have a better name?

## Introduce Constant
There are 2 hardcoded values ("Magic Numbers") in the code - find them, and replace them with a reference to a `const` variable that describes what the values mean.