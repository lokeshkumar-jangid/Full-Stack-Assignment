package com.example.demoproject.services;

import com.example.demoproject.Entities.Person;
import com.example.demoproject.Repositories.PersonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    @Autowired
  private PersonRepo repository;
    public Person saveUser(Person user){
        return repository.save(user);
    }
    public List<Person> getAll(){
        return repository.findAll();
    }

    public void delete(int employeeid){
        repository.deleteById(employeeid);
    }
}
