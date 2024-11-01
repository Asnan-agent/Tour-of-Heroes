import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string[] = []
  
  add(messge: string): void{
    this.message.push(messge);
  }

  clear(){
    this.message = [];
  }
}
