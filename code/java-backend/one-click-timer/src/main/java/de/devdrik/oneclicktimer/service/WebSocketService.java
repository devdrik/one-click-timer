package de.devdrik.oneclicktimer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import de.devdrik.oneclicktimer.enums.State;

@Service
public class WebSocketService {

    @Autowired
    private SimpMessagingTemplate template;

    public void sendState(State state) {
        template.convertAndSend("/topic/status", state.getStateString());
    }
}
