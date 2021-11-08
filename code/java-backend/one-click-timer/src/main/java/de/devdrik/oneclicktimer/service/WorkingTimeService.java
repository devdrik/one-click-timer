package de.devdrik.oneclicktimer.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.devdrik.oneclicktimer.enums.State;
import de.devdrik.oneclicktimer.persistence.models.WorkingTime;
import de.devdrik.oneclicktimer.persistence.repositories.WorkingTimeRepository;

@Service
public class WorkingTimeService {

    private WorkingTimeRepository workingTimeRepository;

    @Autowired
    WorkingTimeService(WorkingTimeRepository workingTimeRepository) {
        this.workingTimeRepository = workingTimeRepository;
    }
    
    public String toggleTimer() {
        WorkingTime lastWorkingTime = workingTimeRepository.findLatest().orElse(new WorkingTime(State.OFF));
        State toggledState = State.toggle(lastWorkingTime.getState());
        WorkingTime newWorkingTime = new WorkingTime(toggledState);

        WorkingTime savedWorkingTime = workingTimeRepository.save(newWorkingTime);

        return savedWorkingTime.getState().getStateString();
    }

    public Iterable<WorkingTime> findAll() {
        return workingTimeRepository.findAll();
    }

    public Duration getCumulativeWorkingTimeOn(LocalDateTime date) {
        Iterator<WorkingTime> timeList = workingTimeRepository.findAllBetween(date.toLocalDate().atStartOfDay(), date.toLocalDate().atTime(23, 59, 59)).iterator();
        Duration duration = Duration.ZERO;
        LocalDateTime previousTime = null;
        WorkingTime current = null;
        while (timeList.hasNext()) {
            current = timeList.next();
            if (previousTime != null && State.OFF.equals(current.getState())) {
                duration = duration.plus(Duration.between(previousTime, current.getCreatedDate()));
            }
            previousTime = current.getCreatedDate();
            System.out.println(previousTime.toString());
        }
        if (current != null && State.ON.equals(current.getState())) {
            duration = duration.plus(Duration.between(current.getCreatedDate(), LocalDateTime.now()));
        }
        return duration;
    }
}
