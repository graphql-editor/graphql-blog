---
title: Top new features in Python 3.8
date: '2019-07-26T11:11:00.284Z'
image: cover.png
author: Robert
---

Python is one of the most popular languages today with the biggest community of all and excellent libraries. People love it for beautiful code, rapid development and sometimes call the language interactive. In latest 3.8 Python version we can find have several outstanding features. This article will describe some of the new features of Python 3.8.

#1. Positional-only parameters (/)

If you want to create a Python function that allows parameters, then you can pass the arguments by position or by keyword.

But what if:

- We want to limit the callers of our API to only call our function by passing in parameters by position? 
- Our parameter names do not make meaning to the external world? 
- Or we might want to rename the parameters in the future? 
- ...And we want to make our API backwards compatible?

Then, positional-only parameter functionality “/” solves it. Let's check our example:

```
def add(x, y, z, c=None, /):
    a = x+y+z
    if c is not None:
        a = a+c
    return a
```

The function “add” accepts three necessary parameters: x,y and z, and an optional parameter c. The last parameter “/” means that the parameters of the function must be specified positionally.  We cannot call the function by passing in parameters by keyword.

- Add(1,2,3) and add(1,2,3,4) are valid calls.
- Add(a=1,b=2,c=3) or add(1,2,3,d=4) are all invalid calls.

Result of the “/” parameter means that the function allows positional-only parameters and thus the arguments must be mapped to the parameters based solely on their position. 

Read more here on new features in Python 3.8 [here](https://docs.python.org/3.8/whatsnew/3.8.html).

#2. Assignment Expressions ":=" 

Also known as walrus operator. It allocates values to variables as part of an expression. There's no need to initialize the variables upfront.

Consider this example:

```
if (variable_a := get_input()) is not None:
 print(variable_a) #exists now
 perform_action(variable_a);
```

Checking the sample above variable_a didn't exist before the line was performed. The walrus operator ":=" declared and initialized the variable “variable_a”. The return of the function “get_input()” is used to attach a value to the variable. As a result, we can now print the value of the variable_a variable. This feature is possible in statement forms and list comprehensions

There are two important points to note. First, assure the designation of the variable is parenthesized. Unparenthesized assignment expressions are forbidden at the top level of an expression statement:

```
variable_a := get_input() #Invalid
(variable_a := get_input()) #Valid but it is not recommended
```

Second, = and := are not the same, and the preference around the commas is different. Check this example below:

```
variable_a = a, b, c # Sets my_variable to (a, b, c)
(variable_a := a, b, c)  # Sets my_variable to a
```

Read more here on new features in Python 3.8 [here](https://docs.python.org/3.8/whatsnew/3.8.html).

#3. “fromisocalendar” has new date and datetime constructors

New constructors date and datetime have been added to return the ISO calendar object:

datetime.fromisocalendar(year, week, day)

This is the inverse of the function: datetime.isocalendar(). Essentially, it takes in the year, week and day and returns the corresponding ISO calendar date-time object.

date.fromisocalendar(year, week, day)

This is the inverse of the function: date.isocalendar(). Naturally, it takes in the year, week and day and returns the corresponding ISO calendar date object.


Read more here on new features in Python 3.8 [here](https://docs.python.org/3.8/whatsnew/3.8.html).

#4. For Debugging Ease, f-strings now support =

This is an enhancement to the f-strings. The specifier “=” can be joined to the f-strings now.

f -strings are in the form of f'{expr=}' Notice the ‘=’. The equal sign primarily evaluates the expression and prints the result too.

Let's check an example. Assume there are two variables “a ”and “b”, and we want to print “a-b” along with the result. We can use the f-strings=

```
a = 100
b = 50
print(f'{input-output=}')
```

The result would now print a-b=50.

It could make the code neater and you don't need to copy the formula on the right-hand side of the “=” to evaluate it. The side effect is that it can be used extensively during debugging.

Read more here on new features in Python 3.8 [here](https://docs.python.org/3.8/whatsnew/3.8.html).
