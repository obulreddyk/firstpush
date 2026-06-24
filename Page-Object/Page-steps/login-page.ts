import{Page,expect} from"@playwright/test";
import pageElements from "../Page-Elements/login-page.json" with{ type: "json" };
import config from"../../Config/ui-config.json" with{type:"json"}
import { Commons } from "../../Commons/UI-commons/Action.ts";
import data from "../../Test-Data/UI/login.json" with {type:"json"}

export class login{
      page:Page;
      webCommons:Commons;
      constructor(page:Page){
        this.page=page;
        this.webCommons=new Commons(page);
      }

      async luanchApplication():Promise<void>{
        await this.webCommons.launchApplication(config.application.url)
      }
       async forgetPassword():Promise<void>{
      
        await this.webCommons.clickOnElment(pageElements.ForgetPassword);
        await this.webCommons.fillText(pageElements.email,data.logincreds.username);
        await this.webCommons.clickOnElment(pageElements.ReserLink);
        this.page.close();
      }

     async luanchApplication2():Promise<void>{
        await this.webCommons.launchApplication(config.application.url)
     }
      async username():Promise<void>{
        await this.webCommons.fillText(pageElements.email,data.logincreds.username);
      }
      async password():Promise<void>{
        await this.webCommons.fillText(pageElements.password,data.logincreds.Password);
      }
      async clickonLoginButton():Promise<void>{
        await this.webCommons.clickOnElment(pageElements.loginButton);
      }
     
   }
