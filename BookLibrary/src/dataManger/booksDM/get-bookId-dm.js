export class GetBookById {


    async getApi(id){
        let data=await this.makeRequest(`http://localhost:3000/books/get-book/${id}`,'GET');
       return data;
        
    }




     // varbos y opciones
     async makeRequest(url,method) {
        try {
          const response = await fetch(url, {
            method:method,
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json",
              },
          });
          return await response.json();
        } catch (error) {
          return error;
        }
      }




}