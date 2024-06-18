package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.entity.User;
import com.ecommerce.sportscenter.repository.UserRepository;
import org.springframework.stereotype.Service;


public interface UserService {

    User registerNewUser(User user);

}
