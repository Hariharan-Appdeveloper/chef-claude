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

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>){

        event.preventDefault();
        console.log(ingredient);
        event.currentTarget;

    }
    return(
        <main className="home-page">
            <form className="add-ingredient-form" onSubmit={handleClick}>
                <input type="text" aria-label="Add Ingredient" placeholder="e.g Oregano" name="ingredient" />
                <button>Add Ingredient</button>
            </form>
            {ingredient.length > 0 && (
                <>
                <section  className="ingredient-list">
                <h2>Ingredients On Hand</h2>
                <ul>
                    {ingredientList}
                </ul>
            </section>
            <section className="submitIngredient">
                    <div className="text-container">
                        <h2>Ready For A Recipe?</h2>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button type="button" onClick={handleSubmit}>Get A Recipe</button>
            </section>
            </>    
            )}

        </main>
    );
}