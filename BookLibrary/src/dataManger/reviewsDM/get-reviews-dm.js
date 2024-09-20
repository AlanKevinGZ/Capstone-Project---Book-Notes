export class GetReview{

    async getApi(id){
        let data=await this.makeRequest(`http://localhost:3000/books-comments/get-review/${id}`,'GET');
       return data;
        
    }
 
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