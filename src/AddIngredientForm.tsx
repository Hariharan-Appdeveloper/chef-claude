import { useState } from "react";
import { IngredientsList } from "./IngredientsList";
import AIRecipe from "./AIRecipe";
import { generateRecipe } from "./ollama";

export function AddIngredientForm(){

    const [ingredient, setIngredient] = useState<string[]>([]);
    let isItemsAvailable: boolean = ingredient.length > 0;
    const [recipe, setRecipe] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


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

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>){

        setIsLoading(true);
        setError("");
        setRecipe("");

        try{
            const generatedRecipe = await generateRecipe(ingredient);
            setRecipe(generatedRecipe);
        }
        catch(err){
            setError(err instanceof Error? err.message : "Failed to Generate Recipe");
        }
        finally{
            setIsLoading(false);
        }

    }

    return(
        <main className="home-page">
            <form className="add-ingredient-form" onSubmit={handleClick}>
                <input type="text" aria-label="Add Ingredient" placeholder="e.g Oregano" name="ingredient" />
                <button>Add Ingredient</button>
            </form>

            <IngredientsList ingredient = {ingredient}/>
           
            {isItemsAvailable && !recipe && <>
                <section className="submitIngredient">
                        <div className="text-container">
                            <h2>Ready For A Recipe?</h2>
                            <p>Generate a recipe from your list of ingredients.</p>
                        </div>
                        <button type="button" onClick={handleSubmit} disabled={isLoading}>{isLoading?"Generating": "Get A Recipe"}</button>
                </section> 
            </>
            }
            {
                error && <p role="alert">{error}</p>
            } 
            {
                recipe && <>
                <section className="suggested-recipe-container">
                    <h2>Chef Claude Recommends:</h2>
                    <pre style={{whiteSpace: "pre-wrap", fontFamily: "inherit"}}>{recipe}</pre>
                </section>
                </>
            }

        </main>
    );
}