import{Locator,Page} from"@playwright/test";

export class Commons{
    page:Page;
    constructor(page:Page){
        this.page=page;
    }
   
 element(locator: string): Locator {
    return this.page.locator(locator);
 }
   
  
  
  async launchApplication(url:string){
     await this.page.goto(url)
  }
 async clickOnElment(locator:string):Promise<void>{
    const element=  this.element(locator);
    element.scrollIntoViewIfNeeded();
    await element.click();


 }
  async fillText(locator:string,text:string):Promise<void>{
    const element= this.element(locator);
     await element.clear();
     await element.fill(text)
  }
 async getText(locator:string):Promise<string>{
    const element= this.element(locator);
    return await element.textContent() ||'';
    
 }
        
}

