package com.diploma.CourtDatabases;

import com.diploma.CourtDatabases.configuration.JpaConfiguration;
import com.diploma.CourtDatabases.entity.EntityIskAdm;
import com.diploma.CourtDatabases.service.EntityIskAdmService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import java.util.List;

@Import(JpaConfiguration.class)
@SpringBootApplication(scanBasePackages={"com.diploma.CourtDatabases"})
public class CourtDatabasesApplication {

	public static void main(String[] args) {
		SpringApplication.run(CourtDatabasesApplication.class, args);
	}
}
