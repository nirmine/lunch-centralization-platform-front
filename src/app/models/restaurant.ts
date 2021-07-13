
 export class Restaurant{
    clé: string="";
    nom: string="";
    adresse: string="";
    numTel: number=0;
    email: string=""
}
export class FileUpload {
    key: string;
    name: string;
    url: string;
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
  }