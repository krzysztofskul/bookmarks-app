package pl.krzysztofskul.bookmarksapp;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin").password("{noop}admin").roles("ADMIN")
                .and()
                .withUser("userguest").password("{noop}userguest").roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/**").hasAnyRole("ADMIN", "USER")
            .anyRequest().authenticated()
            .and()
                .formLogin().loginPage("/login.html").permitAll().loginProcessingUrl("/perform_login")
                //No need to add a LoginController.
                // Needed because if you don't put this, when you call the POST to login you will be redirected to the login.html page.
                .defaultSuccessUrl("/bookmarks-app/index.html", true)
                .failureUrl("/login.html").permitAll()
            .and()
            .logout().permitAll().logoutRequestMatcher(new AntPathRequestMatcher("/logout")
        );
    }



}
