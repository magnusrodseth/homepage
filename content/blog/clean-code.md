---
title: Clean Code by Robert Martin
description:
  My personal summary, reflections and key takeaways after reading this popular
  book about software craftsmanship.
publishedAt: "2022-01-13"
updatedAt?: "2022-01-13"
isPublished: true
tags: ["clean-code"]
---

> Writing clean code is what you must do in order to call yourself a
> professional. **There is no reasonable excuse for doing anything less than
> your best.**

## Foreword

_Clean Code: A Handbook of Agile Software Craftsmanship_, written by Robert C.
Martin, opens up with a foreword by the Danish scientist Jim Coplien. There are
a lot of pretentious lines about clean code being thrown around here, like "God
is in the details" and "We become more fully human, more worthy of the divine
[...]". However, Coplien mentions the **5S philosophy**, and that caught my
attention.

The 5S philosophy is comprised of the following concepts:

- **_Seiri_, or organization (think "sort" in English)**. Know where a piece of
  code is located, and why it is located there.
- **_Seiton_, or tidiness (think "systematize" in English)**. A piece of code
  should be where you expect to find it. If not, it should be refactored.
- **_Seiso_, or cleaning (think "shine" in English)**. Keep the workplace free
  of handing wires, grease, scraps and waste. Try to get rid of comments in your
  code, and rather write self-documenting code.
- **_Seiketsu_, or standardization**. The team agrees on how to keep the
  workplace tidy and clean.
- **_Shutsuke_, or discipline (self-discipline)**. Having the discipline to
  follow that agreed practices, and to frequently reflect on one's work.

With that, "the best pragmatic application of Lean principles to software I have
ever seen in print" begins, according to Coplien.

## Introduction

<Image
  src="/img/blog/clean-code/wtfs-per-minute.png"
  caption="The image that greets you when you start reading this book."
/>

The introduction is spent explaining the structure of the book, and stressing
that **this is hard work**. Through description of principles, patterns and
practices for writing clean code, in addition to multiple case studies, this
book promises than clean code will be part of you "the same way that a bicycle
becomes an extension of your will when you have mastered how to ride it".

Hmmm, can't wait. 🤔

## 1 - Clean Code

### There Will Be Code

Chapter 1 begins by convincing you that **there will always be code**. Even
though machine learning is accelerating rapidly, with developer tools such as
[GitHub Copilot](https://copilot.github.com/), there will always be code. Us
developers are the ones that need to specify requirements in such detail that a
machine can execute our instructions. Such a specification is **code**.

### Bad Code

That requires some notion of what is good code and what is bad code. Before
detailing what good code is (which is the major focus of this book), Martin
focuses for some time on bad code, or rather how you're affected by bad code.

Of course you've been impeded by your own bad code before - every developer has.
So why did you write it? Were you in a hurry? Perhaps you felt pressure to
finish the task at hand quickly, and didn't prioritize refactoring and cleaning
up your working, yet messy, code. Maybe you very tired and bored with the task
at hand. Perhaps the backlog was ever growing, and you saw other more important
tasks that needed to be done. This sort of postponing leads us to _LeBlanc's
law_:

**Later equals never**.

### Your Attitude towards Code

Wading through a rotting code base, us developers tend to find every excuse for
why it is not our fault. Martin highlights the common excuses as (1) the
requirements changed in ways that hindered achieving the original design, (2)
the schedules being too tight to do things the right way, and (3) managers,
customers and marketing getting in the way of quality code. However, Martin
claims that it is generally never anything like this: The problem is us.

**We, the developers, are unprofessional**.

The managers look to _us_ for the information they need to make promises and
commitments. Even if they do not, we should not be shy to share our thoughts.
Customers look to _us_ for validating the system requirements. Project managers
look to _us_ when working out the schedule. In summary, **we share the
responsibility**, especially if that responsibility has to do with bad code.
Most managers want the truth. It's your job to defend the code with equal
passion as the managers trying to push out the product as fast as possible.

#### A Great Analogy

Martin hits the nail on the head with the following example: What if you were a
doctor and had a patient who demanded that you stop washing your hands in
preparation for the surgery due to it taking too much time? The doctor should
absolutely refuse to comply, because **the doctor knows more than the patient
about the risks. It would be unprofessional for the doctor to comply**.

### What is Clean Code?

Now, Martin shifts gears and focuses on explaining what clean code is in order
to prevent bad code. I really like his approach, it being simply highlighting
excerpts from such as
[Bjarne Stroustrup](https://no.wikipedia.org/wiki/Bjarne_Stroustrup),
[Dave Thomas](<https://en.wikipedia.org/wiki/David_A._Thomas_(software_developer)>)
and [Ron Jeffries](https://en.wikipedia.org/wiki/Ron_Jeffries).

#### Bjarne Stroustrup

> I like my code to be elegant and efficient. The logic should be (1)
> straightforward to make it hard for bugs to hide, (2) the dependencies minimal
> in order to ease maintenance, (3) error handling complete according to an
> articulated strategy, and (4) performance close to optimal so as not to tempt
> people to make the code messy with unprincipled optimizations. **Clean code
> does one thing well**.

#### Dave Thomas

> Clean code can be read, and enhanced by a developer other than its original
> author. It has unit and acceptance tests. It has meaningful names. It provides
> one way rather than many ways for doing one thing. It has minimal
> dependencies, which are explicitly defined, and provides a clear and minimal
> API. Code should be literate since depending on the language, not all
> necessary information can be expressed clearly in code alone.

There is a lot to unpack in this quote, but I want to focus on the fact that
Dave Thomas ties clean code to writing tests. Having some experience working in
medium-sized development teams, a code base can become cluttered extremely fast
with only a few people working on a project. Practicing
[Test-driven development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development),
or at least
[Test-last development (TLD)](https://bitfieldconsulting.com/golang/test-last-development),
is very helpful for a rapidly growing code base in respect to maintainability.
**Code without tests is not clean**.

#### Ron Jeffries

Martin dedicates basically a full page to Ron Jeffries thoughts about clean
code. I'm not going to include all of that, but I'll jot down the bullet points
Jeffries highlights:

> In priority order, simple code:
>
> - Runs all the tests
> - Contains no duplication
> - Expresses all the design ideas that are in the system
> - Minimizes the number of entities such as classes, methods, functions, and
>   the like

Note that passing all tests is highest in the priority order for clean code.
_Interesting_. Furthermore, Jeffries goes on to talk about his refactoring
habits with extensive IDE use. I want to include that fact, as I have recently
started using Vim more, trying not to rely on an IDE for development. Jeffries
stresses that **refactoring using an IDE is a great contributor to clean code**.

### Schools of Thought

Up until now, I was a bit unpleased with the way Martin chose his words. They
are very absolute, and leaves little room for other interpretations of a
concept. However, ending chapter 1, Martin informs the reader about the nature
of this book.

He says that the opinions in the book are presented as absolutes, and "we will
not apologize for our stridence". He goes on to say that no school of thought is
absolutely correct, but the rightness within this school does invalidate other
schools of thought. He recognizes that many suggestions in this book may appear
controversial, and that you will probably not agree with all of them. However,
these definition, tips and case studies were carefully thought out by experts
highly experienced in the field of computer science. Thus, it would be a shame
of the reader did not see, and respect, the writer's point of view.

With that, chapter 2 begins, focusing on meaningful names in code.

## 2 - Meaningful Names

Martin spends chapter 2 on meaningful names in a code base. This chapter is
split into multiple subheadings, and I want to highlight the ones I resonated
with the most.

### Use Intention-Revealing Names

The name of a variable, function or class should **answer all the big
questions**: **Why** does it it exist, **what** does it do, and **how** is it
used? Additionally, even though it may seem obvious, refactor the name when you
come up with a better one.

To exemplify, Martin displays two blocks of code:

```java lineNumbers
public List<int[]> getThem() {
    List<int[]> list1 = new ArrayList<int[]>();
    for (int[] x : theList) {
        if(x[0] == 4) {
            list1.add(x);
        }
    }
    return list1;
}
```

The problem with this block of code is not its simplicity, but the
**implicity**. In other words, the context is not explicit in the code itself.
When reading this block of code, we wonder:

1. What is in `theList`?
2. What is the significance of `x[0]`?
3. What is the significance of the constant `4`?
4. How do I use the returned list `list1`?

Martin then provides a much better option, using **intention-revealing names**:

```java lineNumbers
public List<int[]> getFlaggedCells() {
    List<int[]> flaggedCells = new ArrayList<int[]>();
    for (int[] cell : gameBoard) {
        if(cell[STATUS_VALUE] == FLAGGED) {
            flaggedCells.add(cell);
        }
    }
    return flaggedCells;
}
```

This is much more explicit! If we have an object-oriented language, we can make
this code even more readable.

```java lineNumbers
public List<Cell> getFlaggedCells() {
    List<Cell> flaggedCells = new ArrayList<Cell>();
    for (Cell cell : gameBoard) {
        if(cell.isFlagged()) {
            flaggedCells.add(cell);
        }
    }
    return flaggedCells;
}
```

### Make Meaningful Distinctions

Concretely, number-series naming in non-informative. Take a look at this
example:

```java lineNumbers
public static void copyCharacters(char a1[], char a2[]) {
    // Logic goes here
}
```

A simple fix would be to simply **not use number-series naming**:

```java lineNumbers
public static void copyCharacters(char source[], char destination[]) {
    // Logic goes here
}
```

### Use Pronounceable Names

Plain and simple: **Programming is a social activity**. You should not impede
productivity by using names that are not possible to pronounce.

### Use Searchable Names

Here's something that I've not thought of, but that really makes a lot of sense:

**`Readable names == searchable names`**.

Naming a variable `e` is a poor choice, as it is the most common letter in the
English alphabet. Naming a variable `WORK_DAYS_PER_WEEK` is much more readable,
and it is also easier to search for using tools like `Find in Files...` in
modern IDEs!

### Avoid Mental Mapping

Of course, it is okay to use `i` or `j` to keep track of indices when looping
over a simple array. However, this is not scalable or transferrable to other
situations other than looping over an array.

Personally, when looping over a two-dimensional array, I try my best to use
`row` and `col` instead of `i` and `j`, as this is much more readable. Then I
can give the item at a given row and column a descriptive variable name, e.g.
`var cell = cells[row][col];`.

The key takeaway here is that **clarity is king**. Professional programmers use
their powers for good and write code that others can understand.

### Pick One Word per Concept

Have you ever created an application with a
[CRUD structure](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
for persistent storage? When getting an item, should you name the method
`get()`, `read()`, `retrieve()`, `fetch()` or something else?

Let's say you're creating a web API with [Node.js](https://nodejs.org/en/),
using the vanilla `fetch()` function to send HTTP requests. Should your custom
fetch functions be called `fetchUsers()`, `getUsers()`, `readUsers()` or
something else?

The bottom line here is: **Pick one word for one abstract concept and stick with
it**. It helps you and other co-developers down the line.

## 3 - Functions

I felt like this chapter was a bit all over the place. Thus, I will not
structure it as subheadings, but rather a number of bullet points with my key
takeaways.

### Key Takeaways

**A rule of thumb is to keep functions less than approximately 20 lines long**.
Of course, this does not always apply.

**Functions should not be large enough to hold nested structures**. This is
quite inline with the next bullet point.

**Functions should do one thing**. They should do it well. They should do _it_
only, nothing more. However, it is hard to know what that "one thing" really is.

**Mixing levels of abstraction within a function is confusing**. A reader may
not be able to know whether a block of code within a given function is essential
or a little detail.

**We want code to read like a top-down narrative**. In other words, we want
every function to be followed by those at the next level of abstraction. This is
difficult in practice.

Recall Ward's principle: **"You know you are working on clean code when each
routine turns out to be pretty much what you expect"**.

**Don't be afraid to make a name long**. A long descriptive name is better than
a short enigmatic name. A long descriptive name is also better than a long
descriptive comment.

**Hunting for a good name results in favorable restructuring of the code**. You
may see room for refactoring small or larger amounts of code when hunting for a
good name.

**Boolean flag function arguments are ugly**. It complicates the signature of
the function, and causes the function to do more than 1 thing. Put the boolean
logic outside the function, and write custom logic for the two conditional
cases. There are cases where this does not always apply. Use with common sense.

**In order to prevent multiple function parameters, abstract the parameters into
its own class**. Do you agree that `makeCircle(Point point, float radius)` reads
better than `makeCircle(int x, int y, float radius)`? Sometimes, multiple
function arguments highlights a potential level of abstraction.

**Anything that forces you to check the function signature is equivalent to a
double-take**. It's a cognitive break and should be avoided.

**Function should either do something or answer something, but not both**.
Either your function should change the state of an object, or it should return
some information about the object.

**When you use exceptions rather than error codes, the new exception are
_extensions_ of the `Exception` class**. They can be added without forcing any
recompilation or redeployment.

### From a Testing Point of View

Although I did not split this chapter into multiple subheadings, I want to
highlight how function naming and structure affect testing your code.

Function arguments are difficult from a testing point of view. Testing a
function without argument is generally quite trivial. One function argument is
also okay. If we have two or more function arguments, it start getting difficult
to cover all test cases.

Related to this is also function arguments within testing library methods, e.g.
[JUnit](https://junit.org/junit5/). How many times have you written a test and
gotten the order of `expected` and `actual` wrong? Perhaps someone else got it
wrong, and this confused you. Of course, you could check the parameter list of
the method using a modern IDE tool, but why should that really be necessary in
this case? Functions with two or more arguments are problematic, for instance
`assertEquals(expected, actual)`. There is no natural order to argument should
be the first argument in this case.

If we really need multiple arguments in a function, a solution proposed in the
book is to name the function above
`assertExpectedEqualsActual(expected, actual)`. This largely removes the
problem, but I personally think it is a bit messy.

### How Do You Write Functions Like This?

Martin closes this chapter with some great final words after having gone on with
a number of "absolute" truths about what a good function is.

Writing software is like any other kind of writing. You start with a first
draft, and then revisit that content multiple times and improve it. The first
draft is often messy and a bit all over the place, but it is your job to
continuously improve upon it.

Martin tells us about when he writes functions, and I couldn't agree more:
First, they're long and complicated, with different levels of abstraction split
into sections. They may have a long list of arguments. However, **unit tests are
written for the functions such that we validate correct behavior**. After that,
the function is revisited and refactored. Functions are extracted, variables are
rename, and duplication is eliminated. All of this is done whilst the tests
pass.

The end result is a function that follows the rules presented in this chapter.

> I don't write the functions that way to start. I don't think anyone could.

## 4 - Comments

> "Don't comment bad code - rewrite it." -
> [Brian W. Kernighan](https://en.wikipedia.org/wiki/Brian_Kernighan) and
> [P.J. Plaugher](https://en.wikipedia.org/wiki/P._J._Plauger)

### Introduction

Personally, I think this chapter was quite redundant. To me, Martin sheds light
on the most obvious aspects about comments in this chapter. Hence, I will - like
I did with the previous chapter - boil it down to a few key takeaways.

**Comments are at best a necessary evil**. If the programming language is
expressive enough, and you as a programmer has the ability to communicate intent
precisely, there should in theory be no need for comments in your code base.

**Comments lie**. Because developers are lazy and comments are difficult to
maintain, comments lie about the structure of our code. An old comment is often
misplaced.

As an extension of this, **truth can only be found in the code**. I agree with
Martin here.

**Comments are always failures**. Martin thinks that we have them in our code
because we, as developers, cannot figure out how to express ourselves without
them. Personally, I disagree. Comments do have their justified place in a code
base. This will become very apparent in the next key points.

**A comment may provide the intent behind a decision**. We can justify a piece
of code by preceding it with a comment explaining why we did what we did.
Related to this, comments may also **amplify the importance of something**.

### TODO Comments

**`TODO` comments are sometimes reasonable**. Hold on, Martin. I would argue
that **`TODO` comments are very useful to keep around in a code base**. Of
course, when you address the issue at hand, you remove the `TODO`. However,
`TODO`s can be great for remote contribution. For instance, if I'm struggling
with a problem, I can mark it with a descriptive `TODO` and let some other
developer have at it. Additionally, modern IDEs usually provide a feature for
viewing all `TODO`s in a code base. This boost productivity and collaboration.

### API Documentation

If you're writing API documentation, make sure a comment is justified to
include. You do not want something like this:

```java lineNumbers
/**
 * Default constructor.
**/
public Item() {
}

/**
 * The day of the month.
**/
private int dayOfMonth;
```

However, I would argue that adding too much documentation to an API is better
than adding too little. In my experience, this lowers the threshold for daring
to use a part of an API; **a well-documented API makes it easy for the user to
play try out all parts of the API**.

## 5 - Formatting

Before I started reading this book, I had heard from a fellow computer science
student that this book was beginning to lose a bit of relevancy. In other words,
some parts were quite outdated. This chapter is prime example of that.
Nevertheless, I found some useful tips worth jotting down.

### Vertical Formatting

Personally, I have a habit of leaving quite a lot of whitespace around in my
code base. I'm not talking about several lines of whitespace, but perhaps a line
of whitespace separating variables within a method. Martin sheds light on
**vertical openness between concepts**. In other words, similar concepts should
be grouped together _without whitespace_, and different concepts should be
separated _with whitespace_. This may seem obvious, but it is something I'll
have to be working on personally.

As an extension of this, **adding redundant documentation to fields and methods
clutters the vertical readability of your code**. It may be more readable to not
add 15 lines of documentation in total, but rather use descriptive names and
vertically separate different concepts.

### Horizontal Formatting

This includes formatting such as whitespace between operators, line length,
whitespace between keywords, etc... Personally, I feel like this is quite
outdated due to modern IDEs settings for automatically formatting your code with
a keystroke.

However, this leads me into the single thing I really resonated with in this
chapter.

### Team Rules

**Every programmer has his own favorite formatting rules, but if he is in a
team, then the team rules**. A team should sit down and agree on all formatting
rules. This should not be a very long and emotional debate; 5-10 minutes tops.
When the team agrees n formatting rules, configuration files are put into place
to streamline formatting throughout development. An added benefit of this is a
cleaner version control timeline. Let's say I changed 1 line in a file, then
formatted my file according to my personal formatting rules, but not the team's
formatting rules. The Git commit would be extremely cluttered and difficult to
review.

## 6 - Objects and Data Structures

### Introduction

First, a bit of background about me. At the time of writing, I have been
programming for about 3 years, with 2 years of object-oriented experience using
(amongst several languages) Java. This is important to note because this whole
chapter is about objects and data structures, their differences, and when to use
what.

Martin starts off with very basic OOP principles, but quickly moves to more
profound lessons. He says that **hiding implementation is not just a matter of
putting a layer of methods between your class fields**. Hiding implementation is
about abstraction! A class should expose abstract interfaces that allow its
users to manipulate the **essence** of the data, without having to know the
implementation.

### Object and Data Structure Anti-Symmetry

Martin goes on to highlight what he calls the **Object and Data Structure
Anti-Symmetry**. It reads as follows:

> Objects hide their data behind abstractions and expose functions that operate
> on that data. Data structures expose their data and have no meaningful
> functions They are virtual opposites. This difference may seem trivial, but it
> has far-reaching implications.

Furthermore, Martin states:

> Procedural code (code using data structures) makes it easy to add new function
> without changing the existing data structures. OOP code, on the other hand,
> makes it easy to add new classes without changing existing functions.

The complement is also true:

> Procedural code makes it hard to add new data structures because all the
> functions must change. OOP code makes it hard to add new function because all
> the classes must change.

In summary, **the things that are easy for OOP is hard for procedural, and vice
versa**.

I'm sure you've been developing an object-oriented application, and met a
barrier because class `A extends B` no longer holds due to new functionality.
The same goes for procedural code. Martin even states that **mature programmers
know that the idea that everything is an object is a myth**.

This makes me think of the difference between Kotlin and Java, and the benefits
Kotlin provides by **not being a strict object-oriented language**. For more
information on this subject, I recommend watching this video:
[Object-Oriented Programming is Bad](https://www.youtube.com/watch?v=QM1iUe6IofM).

### Train Wrecks

Now that we have a clear sense of the responsibility of an object and a data
structures, Martin presents an example to drive this point home. Inspect the two
lines of code below:

```java lineNumbers
// Alternative 1
String outputDirectory = ctx.getOptions().getScratchDir().getAbsolutePath();

// Alternative 2
Options options = ctx.getOptions();
File scratchDir = options.getScratchDir();
String outputDirectory = scratchDir.getAbsolutePath();
```

Which alternative preserves the goal of a module not knowing the implementation
details of an object that it manipulates
([The Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter))? This
depends on whether `ctx`, `options` and `scratchDir` is an objects or a data
structures, according to the definition above.

Because we cannot be certain, Martin present a nice solution that bypassed all
these problems and still manages to upholds tHe Law of Demeter. Take a look at
the code block below.

```java lineNumbers
// Alternative 3
BufferedOutputStream output = ctx.createScratchFileStream(classFileName);
```

Never mind the details of how this implementation really works. The point is
this: **We have abstracted away necessary details while upholding The Law of
Demeter, clearly maintaining the intent**.
