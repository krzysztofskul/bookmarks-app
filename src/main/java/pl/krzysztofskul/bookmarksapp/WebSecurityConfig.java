package pl.krzysztofskul.bookmarksapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import pl.krzysztofskul.bookmarksapp.user.UserDetailsServiceImpl;
import pl.krzysztofskul.bookmarksapp.user.UserRepository;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	  @Autowired
	  UserRepository userRepository;
	  
	  @Bean
	  public UserDetailsService userDetailsServiceImpl() {
	     return new UserDetailsServiceImpl(userRepository);
	  }
	  
	  @Bean
	  public PasswordEncoder passwordEncoder() {
	     return new BCryptPasswordEncoder();
	  }
	
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		/*
		 * In memory authentication
		 */
		//		 auth.inMemoryAuthentication()
		//		 .withUser("admin").password("{noop}admin").roles("ADMIN") .and()
		//		 .withUser("userguest").password("{noop}userguest").roles("USER");
		 
    	
    	/*
    	 * Database authentication
    	 */
        auth.userDetailsService(userDetailsServiceImpl()).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/resources/static/**").permitAll()
            .antMatchers("/pics/**").permitAll()
            .antMatchers("/header.html", "/footer.html").permitAll()
            .anyRequest()
            .authenticated()
            .and()
                .formLogin().loginPage("/login").permitAll()
                .defaultSuccessUrl("/home", true)
                .failureUrl("/login").permitAll()
            .and()
                .logout()
                .permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
        ;
    }



}
