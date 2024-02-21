package pl.krzysztofskul.bookmarksapp.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	public User loadUserByUsername(String username) {
		return userRepository.findByUsernameAndDisabled(username, false);
	}
	
}
