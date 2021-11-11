package de.devdrik.oneclicktimer.rest;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.expression.spel.support.ReflectivePropertyAccessor.OptimalPropertyAccessor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import de.devdrik.oneclicktimer.persistence.models.WorkingTime;
import de.devdrik.oneclicktimer.service.WorkingTimeService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


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

    @GetMapping("/state")
    public ResponseEntity<String> getState() throws NotFoundException {
        return new ResponseEntity<>(workingTimeService.getState(), HttpStatus.OK);
    }

    @GetMapping("/getall")
    public ResponseEntity<Iterable<WorkingTime>> getAll() {
        return new ResponseEntity<>(workingTimeService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getduration")
    public ResponseEntity<Duration> getDuration() {
        // TODO: use date as a parameter instead of today
        return new ResponseEntity<>(workingTimeService.getCumulativeWorkingTimeOn(LocalDateTime.now()), HttpStatus.OK);
    }

    @PutMapping(value="workingtime/{id}")
    public ResponseEntity<WorkingTime> changeWorkingTime(@PathVariable Long id, @RequestBody WorkingTime workingTime) {
        Optional<WorkingTime> updatedOptional = workingTimeService.update(workingTime);
        ResponseEntity<WorkingTime> response;
        if (updatedOptional.isPresent()) {
            response = ResponseEntity.status(HttpStatus.CREATED)
                                    .body(updatedOptional.get());
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                                    .body(workingTime);
        }
        return response;
    }
    
}