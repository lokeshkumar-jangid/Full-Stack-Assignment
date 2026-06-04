package com.example.demoproject.Repositories;

import com.example.demoproject.Entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepo extends JpaRepository<Person,Integer> {


}
