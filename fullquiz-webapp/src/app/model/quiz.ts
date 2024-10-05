export interface Quiz {
    id:string
    private: boolean;
    theme: string;
    choix: string[];
    info: string;
    question: string;
    niveau: string;
    reponse: string;
  }