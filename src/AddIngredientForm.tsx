import { useState } from "react";

export function AddIngredientForm(){

    const [ingredient, setIngredient] = useState<string[]>([]);

    const ingredientList = ingredient.map((ingredient)=>{
        return <li key={ingredient}>{ingredient}</li>
    })

    function handleClick(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        console.log("Add Ingredient button clicked");
        const formData = new FormData(event.currentTarget);
        const newIngredient = formData.get("ingredient");
        if(typeof newIngredient === "string" && newIngredient.trim() !== ""){
            setIngredient((prev)=>[...prev, newIngredient])
        }
        event.currentTarget.reset();
    }
    return(
        <main className="home-page">
            <form className="add-ingredient-form" onSubmit={handleClick}>
                <input type="text" aria-label="Add Ingredient" placeholder="e.g Oregano" name="ingredient" />
                <button>Add Ingredient</button>
            </form>
            <ul>
                {ingredientList}
            </ul>
        </main>
    );
}