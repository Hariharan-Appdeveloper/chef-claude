import chefClaudeLogo from "./assets/chef-icon.png";

export function Header(){
    return <header className="chefHeader">
        <img className = "chefClaudeLogo" src={chefClaudeLogo}/>
        <h1>Chef-Claude</h1>
    </header>
}