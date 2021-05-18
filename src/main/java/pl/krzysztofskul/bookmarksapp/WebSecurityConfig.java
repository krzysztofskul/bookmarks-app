package pl.krzysztofskul.bookmarksapp;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

//    @Bean
//    public UserDetailsService users() {
//        User.UserBuilder userBuilder = User.withDefaultPasswordEncoder();
//        UserDetails admin = userBuilder.username("admin").password("admin").roles("ADMIN").build();
//        UserDetails userguest = userBuilder.username("userguest").password("userguest").roles("USER").build();
//
//        return new InMemoryUserDetailsManager(admin, userguest);
//    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin").password("{noop}admin").roles("ADMIN")
                .and()
                .withUser("userguest").password("{noop}userguest").roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeRequests()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .and()
            .logout()
            .permitAll()
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout")
        );


    }

}
