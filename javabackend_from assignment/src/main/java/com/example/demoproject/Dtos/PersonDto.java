package com.example.demoproject.Dtos;

public class PersonDto {
    String Username;
    long Mobileno;
    int Age;
    String Role;
    int Employeeid;

    public PersonDto() {
    }

    public PersonDto(int age, int employeeid, long mobileno, String role, String username) {
        Age = age;
        Employeeid = employeeid;
        Mobileno = mobileno;
        Role = role;
        Username = username;
    }

    public int getAge() {
        return Age;
    }

    public void setAge(int age) {
        Age = age;
    }

    public int getEmployeeid() {
        return Employeeid;
    }

    public void setEmployeeid(int employeeid) {
        Employeeid = employeeid;
    }

    public long getMobileno() {
        return Mobileno;
    }

    public void setMobileno(long mobileno) {
        Mobileno = mobileno;
    }

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }
}
