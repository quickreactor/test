/* name
image
description
cookTime
Yield
ingredients
instructions */
let elementArray = Array.from(document.body.children).filter((e) => e.innerText !== "" && e.innerText !== "\n");
let textArray = elementArray.map((e) => e.innerText)

let name = textArray[0] + " " + textArray[1];
let image = document.querySelector("img").src;
let description = textArray[3];
let cookTime = textArray[2].match(/\d{1,2}/g)[0];
let yield = textArray[2].match(/\d{1,2}/g)[1];
let ingredients = textArray[textArray.findIndex((e) => e === "What we send") + 1];
let instructionHeadings = textArray.filter((e) => e.match(/^\d\./)).sort();
let instructionContent = getInstructions();
let instructions = instructionHeadings.map((e, i) => e + '.\n' + instructionContent[i]);


function getInstructions() {
    let pArray = Array.from(document.querySelectorAll("p, h3")).filter(
        (e) => e.style["line-height"] === "115%"
        );
        pArray.shift();
        let ingArray = pArray.reduce((acc, curr, i, arr) => {
            if (i > 0) {
                let a = parseInt(arr[i - 1].style["padding-left"]);
                let b = parseInt(curr.style["padding-left"]);
                if (a === b) {
                    //they are the same padding
                    acc[acc.length - 1] += " " + curr.innerText;
                } else {
                    acc.push(curr.innerText);
                }
            } else {
                acc.push(curr.innerText);
            }
            return acc;
        }, []);
        return ingArray;
    }
    
    function rebuild() {
        document.body.innerHTML = `<div itemscope itemtype="https://schema.org/Recipe">
        <span itemprop="name" class="name">Mom's World Famous Banana Bread</span>
        <img itemprop="image" src="bananabread.jpg" class="image" />
        
        <span itemprop="description" class="description"
        >This classic banana bread recipe comes from my mom -- the walnuts add a
        nice texture and flavor to the banana bread.</span
        >
        
        Cook time: <meta itemprop="cookTime" content="PT1H" class="cook-time" />1 hour
        Yield: <span itemprop="recipeYield" class="yield">2 People</span>
        
        <div class="ingredient-container">
        </div>
        
        <span itemprop="recipeInstructions" class="instructions">
        Instructions:
        </span>
        </div>`;
        
        let nameEl = document.querySelector(".name");
        let imageEl = document.querySelector(".image");
        let descriptionEl = document.querySelector(".description");
        let cookTimeEl = document.querySelector(".cook-time");
        let yieldEl = document.querySelector(".yield");
        let ingredientsEl = document.querySelector(".ingredient-container");
        let instructionsEl = document.querySelector(".instructions");

        let ingredientTemplate = `<span itemprop="recipeIngredient">1 egg</span>`;

        nameEl.innerHTML = name;
        imageEl.src = image;
        descriptionEl.innerHTML = description;
        cookTimeEl.innerHTML = cookTime;
        yieldEl.innerHTML = yield;
        ingredients.split('\n').forEach(e => {
            let el = document.createElement('span');
            el.setAttribute('itemprop', 'recipeIngredient');
            el.innerHTML = e;
            ingredientsEl.append(el);
        });;
        instructionsEl.innerHTML = instructions.join('\n\n');
}

rebuild();
