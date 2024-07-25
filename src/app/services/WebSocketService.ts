// src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { StompService, StompState } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompService: StompService;

  constructor() {
    this.stompService = new StompService({
      url: () => new SockJS('http://localhost:8080/ws'),
      headers: {},
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: false
    });
  }

  public subscribeToStatusUpdates(): Observable<string> {
    return this.stompService.subscribe('/topic/status').pipe(
      map((message) => message.body)
    );
  }

  public getStompState(): Observable<StompState> {
    return this.stompService.state;
  }
}
