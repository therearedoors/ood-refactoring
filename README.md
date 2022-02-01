# Refactoring

## Learning Objectives
* Explain the meaning of the term "refactoring"
* Explain how code smells help to identify possible refactoring opportunities
* Demonstrate refactoring a program to improve quality while using tests to verify correctness

## Introduction
Refactoring is the process of improving the design and structure of existing code without altering it's behavior. Refactoring is not something that happens with a single, large one-off effort. Refactoring is a regular part of day-to-day development. We refactor in small steps, little and often, using our tests after each small change to help us verify our code remains working. Persistent refactoring helps to keep our code **easy to understand** and **easy to change**.

But how do we know _when_ we should refactor?

## Code Smells

Code Smells are a semi-formal way of classifying some common code issues that we can target for refactoring.

> A code smell is a surface indication that usually corresponds to a deeper problem in the system. Kent Beck first coined the term. It became popular after its appearance in Martin Fowler’s book, Refactoring: Improving the Design of Existing Code. Code smells are subjective and vary based on developer, language, and methodology, among other factors.

## Common Smells

There a large number of documented and generally agreed upon code smells. Here are some of the most common:

### Uncommunicative Names

A variable name, method name or class name does not clearly communicate it's purpose.

```javascript
function update(num) {
  const todo = this.getTodo(num)
  todo.setCompleted()
}
```

### Inconsistent Names

Names used are inconsistent. The same concepts are described using different terms throughout the code.

```javascript
class TodoList {
  deleteTodo(todoId) {
    //
  }

  updateById(id) {
    //
  }

  getCompletedTodos() {
    //
  }

  getIncomplete() {
    //
  }
}
```

### Duplicated Code
Large sections of code are duplicated through the program.


```javascript
class TodoList {
  getCompletedTodos() {
    const todos = []
    for(const todo of this.todos) {
      if(todo.status=="complete") {
        todos.push(todo)
      }
    }

    return todos
  }

  getIncomplete() {
    const todos = []
    for(const todo of this.todos) {
      if(todo.status=="incomplete") {
        todos.push(todo)
      }
    }

    return todos
  }
}
```

### Long Method
A method is performs multiple unrelated operations in a single sequence. The method logic is hard to follow.

```javascript
totalSum(discounts = []) {
  let discountSaving = 0;
  const bagelsToPrice = this.bagels;

  for (let i = 0; i < discounts.length; i++) {
    const discount = discounts[i];

    if (discount.discountType === "bulk-buy") {
      const usualCost = discount.quantity * Inventory.getPrice(discount.bagelType);
      const discountCost = discount.price;
      const deduction = usualCost - discountCost;
      let bagelTypeCount = 0;
      for (let j = 0; j < this.bagels.length; j++) {
        if (this.bagels[j].type === discount.bagelType) {
          bagelTypeCount++;
        }
      }

      const discountQuantity = Math.floor(bagelTypeCount / discount.quantity);
      discountSaving += discountQuantity * deduction;

    } else if (discount.discountType === "combo") {
      let usualCost = 0;
      for (let j = 0; j < discount.items.length; j++) {
        usualCost += Inventory.getPrice(discount.items[j]);
      }

      const discountCost = discount.price;
      const deduction = usualCost - discountCost;
      let discountApplies = true
      for (let j = 0; j < discount.items.length; j++) {
        let itemFound = false
        for (let k = 0; k < this.bagels.length; k++) {
          if (this.bagels[k].type === discount.items[j]) {
            itemFound = true
          }
        }          
        if (itemFound == false) {
          discountApplies = false
        }
      }

      if (discountApplies) {
        discountSaving += deduction;
      }
    }
  }
```

### Large Class
A class has a large number of properties or methods. The properties and methods are unrelated. It has too many responsibilities and lacks cohesion.

```javascript
class Basket {

  addItem() {
    ///
  }

  removeItem() {
    //
  }

  getStockLevels() {
    ///
  }

  getSpecialOffers() {
    ///
  }

  applySpecialOffers() {
    ///
  }

  getShippingAddress() {
    ///
  }

  takePayment() {
    ///
  }

  calculateChange() {
    ///
  }
}

```

### Complex Conditional
A single conditional contains multiple clauses that are hard to understand

```javascript
if (date.before(SUMMER_START) || date.after(SUMMER_END)) {
  charge = quantity * winterRate + winterServiceCharge;
}
```

### Comments
The code must be excessively commented in order to understand what it does.

```javascript
 if (discount.discountType === "bulk-buy") {
  //The usual of that item
  const uc = discount.quantity * Inventory.getPrice(discount.bagelType);
  //The cost with the discount
  const dc = discount.price;
  //The deduction from the final price?
  const deduction = uc - dc;
  //How many times does this discount apply to the basket? We need know how many of this type?
  let bagelTypeCount = 0;
  for (let j = 0; j < this.bagels.length; j++) {
    //Does the bagel type match the discount bagel type
    if (this.bagels[j].type === discount.bagelType) {
      tc++;
    }
  }
  //How many times should we apply this discount?
  const q = Math.floor(tc / discount.quantity);
```

### Magic Numbers
Special hardcoded numbers or strings are used throughout the code with no clear meaning

## Exercise
Look at the Cinema class in `src/cinema.js`. How many Code Smells from the list above can you spot? Go through the code and annotate your forked copy with comments whenever you notice a code smell. Don't worry about how you'd "fix it" at this point, just try to recognize where the smells are.

## Refactorings
Draw up a table with 2 columns. In the first column, list the Code Smells from the section above. In the second, list one or more refactorings from the list below that you could apply to remove that code smell.

* Extract Method - Create a new method based on existing code
* Extract Class - Create a new class based on existing code
* Introduce Explaining Variable - Create a new variable to help explain the purpose of an intermediate value
* Introduce Constant - Create a new constant
* Rename Method - Rename an existing method
* Rename Variable - Rename an existing variable

See https://refactoring.com/catalog/ for examples of some of these refactorings.

## Exercise Part 2
Take the list of refactorings from the previous step and apply these to the Cinema class wherever you identified a code smell. Remember:

- Refactor in small, incremental steps. 
- Use tests to constantly verify  code is still working after each change
- Start with small changes such as rename variable, then move on to more complex refactorings such as extract method

If you are not sure what to do next or are stuck, check out the files in `hints` folder for each step.

In industry, you could spend a long time endless trying to improve the same piece of code. Refactoring is never finished, it's something we do continuously, so at some point you need to decide it's "good enough". For this exercise, try to complete **one or more** of the refactorings in each step.

### Core
- Rename Method
- Rename Variable
- Introduce Constant

### Extension 1
- Introduce Explaining Variable / Extract Method

*For this part, you might chose to use Extract Method rather than Introduce Explaining Variable for at least of the refactoring opportunities*

### Extension 2
- Extract Class

## Extra Work

- The list of films and screens are stored in arrays, but are also uniquely identified by name. Is there another data structure we could use instead of array?

## Discussion
During the course of refactoring you may have changed the implementation of a method only, or sometimes you might have had to change the method name, arguments or move the method somewhere else entirely. It's likely that with the first type of change you didn't need to update any tests, but with the second type change you would almost always have to update tests or even introduce new tests. Is there any lesson you can take from this with regards to how you design the public and private interface of a class?

## Additional References
* https://refactoring.guru/
* https://blog.codinghorror.com/code-smells/