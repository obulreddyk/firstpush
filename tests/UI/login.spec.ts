import{test,expect,TestInfo} from "@playwright/test";
import {login} from"../../Page-Object/Page-steps/login-page.ts";
import data from"../../Test-Data/UI/login.json" with {type:"json"};
import { before } from "node:test";

test.describe("Test the login flow ",()=>{
  let loginstep:login;
  test.beforeEach(async({page})=>{
    loginstep=new login(page);
  })
test("verify the forget link",async({page})=>{
    await loginstep.luanchApplication();  
});
test("verify whether user able to login or not",async({page})=>{
   await loginstep.luanchApplication2();
})

});
