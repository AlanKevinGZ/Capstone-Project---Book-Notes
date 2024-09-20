export class CreateBook{

    async postApi(body){
        let data=await this.makeRequest(`http://localhost:3000/books/create-book`,'POST',body);
       return data;
        
    }




     // varbos y opciones
     async makeRequest(url,method,body) {
        try {
          const response = await fetch(url, {
            method:method,
            headers: {
                "Content-Type": "application/json", 
              },
              body: JSON.stringify(body),
          });
          return await response.json();
        } catch (error) {
          return error;
        }
      }

}