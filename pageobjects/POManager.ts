import { LoginPage }  from "./LoginPage";
import { CartPage } from "./CartPage";
import { FavouritePage } from "./FavouritePage";
import { Page } from "playwright";

export class POManager {

    loginPage: LoginPage;
    cartPage: CartPage;
    favouritePage: FavouritePage;
    page: Page


    constructor(page:Page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.favouritePage = new FavouritePage(this.page);
        
    }

    getLoginPage() {

        return this.loginPage;

    }

    getCartPage() {

        return this.cartPage;

    }

    getFavouritePage() {

        return this.favouritePage;

    }

}

module.exports={POManager};