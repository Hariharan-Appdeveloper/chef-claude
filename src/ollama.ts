export async function generateRecipe(ingredients:string[]): Promise<string> {
    const response = await fetch("http://localhost:11434/api/chat",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            model: "llama3.2",
            messages:[
                {
                    role: "user",
                    content:`You are Chef Claude, an expert chef.

                        Generate one delicious recipe using these ingredients:
                        ${ingredients.join(", ")}

                        Include:
                        - Recipe title
                        - Short description
                        - Ingredients
                        - Numbered cooking instructions
                        - Cooking time

                        Return the recipe in Markdown.`
                },
            ],
            stream: false,
        }),
    });

    if(!response.ok){
        throw new Error(`ollama request failed: ${response.status}`);
    }

    const data = await response.json();

    return data.message.content;
    
}