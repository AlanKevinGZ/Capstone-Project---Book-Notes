export class EditBook{

    async putApi(body,id){
        let data=await this.makeRequest(`http://localhost:3000/books/edit-book/${id}`,'PUT',body);
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