package de.devdrik.oneclicktimer.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Iterator;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
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

    public Optional<WorkingTime> update(WorkingTime workingTime) {
        Optional<WorkingTime> updated = Optional.empty();
        if(workingTimeRepository.findById(workingTime.getId()).isPresent()) {
            updated = Optional.of(workingTimeRepository.save(workingTime));
        }
        return updated;
    }

    public Collection<WorkingTime> findAllAtDate(LocalDateTime date) {
        return workingTimeRepository.findAllBetween(date.toLocalDate().atStartOfDay(), date.toLocalDate().atTime(23, 59, 59));
    }

    public Duration getCumulativeWorkingTimeOn(LocalDateTime date) {
        Iterator<WorkingTime> timeList = findAllAtDate(date).iterator();
        Duration duration = Duration.ZERO;
        LocalDateTime previousTime = null;
        WorkingTime current = null;
        while (timeList.hasNext()) {
            current = timeList.next();
            if (previousTime != null && State.OFF.equals(current.getState())) {
                duration = duration.plus(Duration.between(previousTime, current.getCreatedDate()));
            }
            previousTime = current.getCreatedDate();
        }
        if (current != null && State.ON.equals(current.getState())) {
            duration = duration.plus(Duration.between(current.getCreatedDate(), LocalDateTime.now()));
        }
        return duration;
    }

    public String getState() throws NotFoundException {
        Optional<WorkingTime> workingTimeOptional = workingTimeRepository.findLatest();
        if (workingTimeOptional.isEmpty()) {
            throw new NotFoundException();
        }
        return workingTimeOptional.get().getState().getStateString();
    }
}
