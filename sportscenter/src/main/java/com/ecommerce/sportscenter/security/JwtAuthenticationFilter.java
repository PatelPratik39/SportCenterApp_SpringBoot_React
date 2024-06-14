package com.ecommerce.sportscenter.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.security.SignatureException;

import java.io.IOException;

@Component
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtHelper jwtHelper;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtHelper jwtHelper, UserDetailsService userDetailsService) {
        this.jwtHelper = jwtHelper;
        this.userDetailsService = userDetailsService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String requestHeader = request.getHeader("Authorization");
        log.info("Authorization Header: {}", requestHeader);

        String userName = null;
        String token = null;

        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            token = requestHeader.substring(7);
            try {
                userName = jwtHelper.getUserNameFromToken(token);
            } catch (IllegalArgumentException e) {
                log.error("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                log.error("JWT Token has expired");
            } catch (MalformedJwtException e) {
                log.error("JWT Token is malformed");
            } catch (SignatureException e) {
                log.error("JWT Token signature validation failed");
            }
        } else {
            log.warn("JWT token doesn't start with Bearer String");
        }

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
            if (jwtHelper.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                log.info("Invalid JWT Token");
            }
        }

        filterChain.doFilter(request, response);
    }
}

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//            String requestHeader = request.getHeader("Authorization");
//            log.info("Header : {}", requestHeader);
//
//            String userName = null;
//            String token = null;
//
//            if(requestHeader != null && requestHeader.startsWith("Bearer ")){
//                token = requestHeader.substring(7);
//                try{
//                    userName = this.jwtHelper.getUserNameFromToken(token);
//
//                }
//                catch (IllegalArgumentException | ExpiredJwtException | MalformedJwtException e){
//                    log.info("Jwt Token Processing Error!!");
//                    e.printStackTrace();
//                }
//            } else {
//                log.warn("JWT token doesn't start with Bearer String");
//            }
//            if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
////                Fetch User details
//                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userName);
//                Boolean validateToken = this.jwtHelper.validateToken(token, userDetails);
//                if(validateToken){
////                    set the Authentication
//                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//                }else{
//                    log.info("Token is not valid");
//                }
//            }
//            filterChain.doFilter(request,response);
//    }
//}
