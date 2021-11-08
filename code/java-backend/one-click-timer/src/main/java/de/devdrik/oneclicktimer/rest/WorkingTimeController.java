package de.devdrik.oneclicktimer.rest;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import de.devdrik.oneclicktimer.persistence.models.WorkingTime;
import de.devdrik.oneclicktimer.service.WorkingTimeService;

@RestController
public class WorkingTimeController {

    private WorkingTimeService workingTimeService;

    @Autowired
    WorkingTimeController(WorkingTimeService workingTimeService) {
        this.workingTimeService = workingTimeService;
    }

    @GetMapping("/toggle")
    public ResponseEntity<String> toggleTimer() {
        return new ResponseEntity<>(workingTimeService.toggleTimer(), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Iterable<WorkingTime>> getAll() {
        return new ResponseEntity<>(workingTimeService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getDuration")
    public ResponseEntity<Duration> getDuration() {
        // TODO: use date as a parameter instead of today
        return new ResponseEntity<>(workingTimeService.getCumulativeWorkingTimeOn(LocalDateTime.now()), HttpStatus.OK);
    }
    
}