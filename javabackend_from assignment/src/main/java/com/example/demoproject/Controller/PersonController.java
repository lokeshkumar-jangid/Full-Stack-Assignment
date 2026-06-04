package com.example.demoproject.Controller;

import com.example.demoproject.Dtos.PersonDto;
import com.example.demoproject.Entities.Person;
import com.example.demoproject.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/check")
@CrossOrigin(origins = "*")
public class PersonController{


    @Autowired
    private PersonService service;

    // SAVE USER
    @PostMapping("/save")
    public Person saveUser(@RequestBody PersonDto dto) {

        Person person = new Person();

        person.setUsername(dto.getUsername());
        person.setAge(dto.getAge());
        person.setEmployeeid(dto.getEmployeeid());
        person.setMobileno(dto.getMobileno());
        person.setRole(dto.getRole());

        return service.saveUser(person);
    }
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id){

        service.delete(id);

        return "Deleted";
    }
    @GetMapping("/all")
    public List<Person> getAll(){
        return service.getAll();
    }
}
