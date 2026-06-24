import{test} from"@playwright/test";
import{Apicommons} from"../../Commons/API-Commons/API-common";
import data from "../../Test-Data/API/API.json";
import config from "../../Config/ui-config.json"

test.describe("Login test via api",()=>{
 let apicoms:Apicommons;

 test.beforeEach(async()=>{
    apicoms=new Apicommons();

    await apicoms.baseclass();

 });

 test("SEND OTP",async()=>{
    const creds=data.loginotprequest;
    await apicoms.getResponse(creds.requestType,creds.endpoint,creds.body);

 })
 test("verify OTP",async()=>{
    const otp= data.loginotpverification;
    await apicoms.getResponse(otp.requestType,otp.endpoint,otp.body)
 })


})