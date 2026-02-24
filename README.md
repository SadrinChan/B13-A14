# Job Application Tracker

A simple job application tracking website built with HTML, Tailwind CSS, and Vanilla JavaScript.

---

## Answers to Questions

**1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?**

`getElementById` is used to select one specific element by its id. It returns that single element.

```js
const total = document.getElementById("total");
```

`getElementsByClassName` selects all elements that have a specific class name. It returns an HTMLCollection which is like an array.

```js
const cards = document.getElementsByClassName("card");
```

`querySelector` selects the first element that matches a CSS selector. `querySelectorAll` selects all matching elements and returns a NodeList.

```js
const firstCard = document.querySelector(".card");
const allCards = document.querySelectorAll(".card");
```

---

**2. How do you create and insert a new element into the DOM?**

First I use `document.createElement()` to create a new element. Then I add content to it using `innerHTML` or `innerText`. Finally I use `appendChild()` to insert it into the page.

```js
const newDiv = document.createElement("div");
newDiv.innerHTML = "<p>No jobs available</p>";
document.getElementById("jobList").appendChild(newDiv);
```

---

**3. What is Event Bubbling? And how does it work?**

Event bubbling means when you click on an element, the event does not stop there. It travels up to the parent element, then to the parent's parent, and keeps going up until it reaches the top of the page.

For example if I click a button inside a div, first the button's click event fires, then the div's click event fires, then the body's, and so on upward.

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

If I click the button, the event bubbles up to the div as well.

---

**4. What is Event Delegation in JavaScript? Why is it useful?**

Event delegation means instead of adding a click listener to every single child element, I add just one listener to the parent element. When a child is clicked, the event bubbles up to the parent and I can handle it there.

It is useful because it saves memory and works even for elements that are added to the page dynamically later.

```js
document.getElementById("jobList").addEventListener("click", function(e) {
  if (e.target.classList.contains("deleteBtn")) {
    e.target.closest(".card").remove();
  }
});
```

---

**5. What is the difference between preventDefault() and stopPropagation() methods?**

`preventDefault()` stops the browser from doing its default action. For example when you click a link it normally navigates to another page, but `preventDefault()` stops that.

```js
link.addEventListener("click", function(e) {
  e.preventDefault(); // page will not navigate
});
```

`stopPropagation()` stops the event from bubbling up to parent elements. So the parent's event listener will not get triggered.

```js
button.addEventListener("click", function(e) {
  e.stopPropagation(); // parent click event will not fire
});
```

The main difference is: `preventDefault()` stops the browser's default behavior, while `stopPropagation()` stops the event from traveling up to parent elements.