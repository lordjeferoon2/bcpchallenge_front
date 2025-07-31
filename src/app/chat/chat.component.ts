import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { environment } from '../../environments/environment';

interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  message = '';
  chatHistory: ChatMessage[] = [];
  sessionId = 'cliente-123';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const saved = sessionStorage.getItem('chatHistory');
      const session = sessionStorage.getItem('sessionId');
      this.chatHistory = saved ? JSON.parse(saved) : [];
      this.sessionId = session || this.generateAndSaveSessionId();
    } else {
      this.chatHistory = [];
      this.sessionId = this.generateUUID();
    }
  }

  generateAndSaveSessionId(): string {
    const id = this.generateUUID();
    sessionStorage.setItem('sessionId', id);
    return id;
  }

  sendMessage(): void {
    if (!this.message.trim()) return;

    if (!this.sessionId) {
      this.sessionId = this.generateAndSaveSessionId();
    }

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      from: 'user',
      text: this.message,
      timestamp: now
    };

    this.chatHistory.push(userMessage);
    this.saveChat();

    const body = {
      message: this.message,
      session_id: this.sessionId
    };

    this.http.post<any>(environment.apiUrl, body).subscribe({
      next: (res) => {
        const botMessage: ChatMessage = {
          from: 'bot',
          text: res || 'Sin respuesta',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        this.chatHistory.push(botMessage);
        this.saveChat();
      },
      error: () => {
        this.chatHistory.push({
          from: 'bot',
          text: 'Error al conectar con el servidor',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        this.saveChat();
      }
    });

    this.message = '';
  }


  saveChat(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    }
  }

  clearChat(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('chatHistory');
      sessionStorage.removeItem('sessionId');
    }
    this.chatHistory = [];
    this.sessionId = '';
  }

  getTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  generateUUID(): string {
    return crypto.randomUUID(); // si quieres compatibilidad más amplia, puedo darte una alternativa
  }
}
