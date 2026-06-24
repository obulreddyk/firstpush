import{request,expect} from"@playwright/test";

export class Apicommons{    
 private response:any;
 private context:any;

  async baseclass(){
    this. context=await request.newContext({
        baseURL:"https://qa-iam.neokred.tech:9444/iam-svc/api/v2/auth/user/login",
        extraHTTPHeaders:{
            "Content-Type":"application/json",
        }
    })

}
async getResponse(requestType:string,endpoint:string,requestBody?:any){
    switch(requestType.toLowerCase()){
        case"post":
        this.response=await this.context.post(endpoint,{data:requestBody})
        break;
     case"get":
        this.response=await this.context.get(endpoint,{data:requestBody})
        break;

        }

    }

}

    

    

