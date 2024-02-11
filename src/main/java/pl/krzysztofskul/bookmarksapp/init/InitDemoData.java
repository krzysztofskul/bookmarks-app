package pl.krzysztofskul.bookmarksapp.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import pl.krzysztofskul.bookmarksapp.user.Role;
import pl.krzysztofskul.bookmarksapp.user.RoleRepository;
import pl.krzysztofskul.bookmarksapp.user.User;
import pl.krzysztofskul.bookmarksapp.user.UserRepository;

@Component
public class InitDemoData {

	  @Autowired
	  private UserRepository userRepository;
	  @Autowired
	  private RoleRepository roleRepository;
	  @Autowired
	  private PasswordEncoder passwordEncoder;
	  @EventListener
	  public void appReady(ApplicationReadyEvent event) {
	     if(roleRepository.count() ==0 ) {
	        System.out.println("Saving demo data");
	        Role roleAdmin = new Role("ADMIN");
	        Role roleUser = new Role("USER");
	        roleRepository.save(roleAdmin);
	        roleRepository.save(roleUser);
	        User userAdmin = new User("useradmin", passwordEncoder.encode("test"), roleAdmin);
	        User userReader = new User("userguest", passwordEncoder.encode("test"), roleUser);
	        userRepository.save(userAdmin);
	        userRepository.save(userReader);
	        System.out.println("Demo data saved successfully.");
	     }
	  }
	
}
