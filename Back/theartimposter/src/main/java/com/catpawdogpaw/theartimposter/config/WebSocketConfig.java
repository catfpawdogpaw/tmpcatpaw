package com.catpawdogpaw.theartimposter.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final MatchHandler matchHandler;
    
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(matchHandler, "/match").setAllowedOrigins("*");
    } 
    
    // 클라이언트가 WebSocket 서버에 연결하기 위한 엔드포인트
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/wait-service/wait-websocket")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
    
    // 메세지 브로거 옵션 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/wait-service/waitroom/sub", "/queue");
        registry.setApplicationDestinationPrefixes("/wait-service");
    }


}